import axios from "axios";

export const getCategory = async () => {
  try {
    const res = (await axios.get("https://opentdb.com/api_category.php")).data;
    const data = res?.trivia_categories;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (category, amount = 10) => {
  try {
    console.log("Fetching questions...");
    const url = category
      ? `https://opentdb.com/api.php?amount=${amount}&category=${category}`
      : `https://opentdb.com/api.php?amount=${amount}`;
    const res = (await axios.get(url)).data;
    const data = res?.results;
    return data;
  } catch (error) {
    console.log(error);
  }
};
