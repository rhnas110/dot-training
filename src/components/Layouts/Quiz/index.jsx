import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { trackGAEvent } from "@/utils/googleAnalytics";
import { Swal } from "@/utils/swal";
import { getCategory, getQuestion } from "@/vendor/api/question";

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const Quiz = () => {
  const { category } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestion(category);
        const fetchedQuestions = response?.map((question) => ({
          question: question.question,
          choices: [
            ...question.incorrect_answers,
            question.correct_answer,
          ].sort(() => Math.random() - 0.5),
          correctAnswer: question.correct_answer,
        }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const getCategoryName = async () => {
      const CATEGORY = await getCategory().then((res) => res);
      const categoryName = CATEGORY.find(
        (item) => item.id === parseInt(category)
      );
      setCategoryName(categoryName?.name);
    };

    const storedQuizData = JSON.parse(
      localStorage.getItem(`quizData-${category}`)
    );
    if (storedQuizData) {
      // Load saved data from localStorage
      setQuestions(storedQuizData.questions);
      setCurrentQuestion(storedQuizData.currentQuestion);
      setSelectedOption(storedQuizData.selectedOption);
      setAnswers(storedQuizData.answers);
      setTimeLeft(storedQuizData.timeLeft);
      setCategoryName(storedQuizData.categoryName);
    } else {
      // Fetch from API
      fetchQuestions();
      getCategoryName();
    }
  }, [category]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    } else {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Handle option selection
  const handleOptionChange = (index) => {
    setSelectedOption(index);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = index;
    setAnswers(updatedAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
    trackGAEvent("Button", "Click", "Option Selected");
  };

  // Handle submit
  const handleSubmit = () => {
    const correctAnswers = questions.map((q) => q.correctAnswer);
    const correctCount = answers.filter(
      (answer, index) =>
        questions[index].choices[answer] === correctAnswers[index]
    ).length;
    const totalAnswered = answers.filter((answer) => answer !== null).length;

    // Update score in localStorage
    localStorage.setItem(`score-${category}`, correctCount * 10);
    // REMOVE SAVED DATA
    localStorage.removeItem(`quizData-${category}`);

    Swal.fire({
      title: "Hasil Kuis",
      html: `<p>Jumlah Benar: ${correctCount}</p><p>Jumlah Salah: ${
        questions.length - correctCount
      }</p><p>Total Jawaban: ${totalAnswered}</p>`,
      icon: "info",
      confirmButtonColor: "#7e50d7",
      confirmButtonText: "OK",
      width: 369,
    }).then(() => {
      trackGAEvent("Button", "Click", "Submit");
      navigate(`/leaderboard/${category}`);
    });
  };

  // Save data to localStorage
  const saveQuizData = () => {
    const quizData = {
      questions,
      currentQuestion,
      selectedOption,
      answers,
      timeLeft,
      categoryName,
    };
    localStorage.setItem(`quizData-${category}`, JSON.stringify(quizData));
  };

  // Handle beforeunload
  useEffect(() => {
    window.onbeforeunload = (e) => {
      saveQuizData();
      e.preventDefault();
      e.returnValue =
        "Apa anda ingin refresh? Jawaban mungkin tidak akan tersimpan";
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [questions, currentQuestion, selectedOption, answers, timeLeft]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveQuizData();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [questions, currentQuestion, selectedOption, answers, timeLeft]);

  if (!questions?.length) {
    return <div className="w-full h-full p-4 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      <div className="w-full mb-4 rounded-lg shadow bg-light">
        <div className="h-3 rounded-t-lg bg-primary-700"></div>
        <div className="w-full p-4">
          <h2 className="mb-2 text-2xl font-bold">
            Stage {categoryName || ""}
          </h2>
          <p className="text-sm text-red-600">
            Note: Ketika sudah pilih jawaban, akan pindah ke soal selanjutnya
          </p>
        </div>
      </div>
      <div className="w-full mb-4 rounded-lg shadow-md bg-light">
        <div className="flex items-center justify-between px-4 py-2 rounded-t-lg text-light bg-primary-700">
          <p>
            {currentQuestion + 1}/{questions.length}
          </p>
          <p className="text-xs">{formatTime(timeLeft)}</p>
        </div>
        <div className="w-full p-4 select-none">
          <p
            className="mb-2"
            dangerouslySetInnerHTML={{
              __html: questions[currentQuestion].question,
            }}
          ></p>
          {questions[currentQuestion].choices.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`option-${index}`}
                name="quiz-option"
                value={index}
                checked={selectedOption === index}
                onChange={() => handleOptionChange(index)}
                className="flex-shrink-0 w-4 h-4 mr-2 accent-primary-700"
              />
              <label
                htmlFor={`option-${index}`}
                dangerouslySetInnerHTML={{ __html: option }}
              ></label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end w-full">
        {currentQuestion === questions.length - 1 && (
          <button
            className={cn(
              "px-4 py-3 font-bold transition-colors duration-300 rounded-lg shadow-md select-none text-primary-700 bg-light hover:bg-primary-700 hover:text-light",
              {
                "opacity-50 cursor-not-allowed":
                  selectedOption === null || selectedOption === undefined,
              }
            )}
            onClick={handleSubmit}
            disabled={selectedOption === null || selectedOption === undefined}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
