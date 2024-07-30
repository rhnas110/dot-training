import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory } from "@/vendor/api/question";
const withQuizProtection = (WrappedComponent) => {
  return (props) => {
    // Check if the quiz URL parameters are valid
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const isFinished = localStorage.getItem(`score-${category}`);
      if (isFinished) {
        navigate(`/leaderboard/${category}`);
      }

      // Check if the quiz URL parameters are valid
      const checkData = async () => {
        const CATEGORY = await getCategory().then((res) => res);
        const data = CATEGORY.find((item) => item.id === parseInt(category));
        if (!data) {
          navigate("/dashboard");
          return;
        }
      };
      checkData();
    }, [category, navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withQuizProtection;
