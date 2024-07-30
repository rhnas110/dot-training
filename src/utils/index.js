import axios from "axios";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function randomName() {
  const { data } = await axios.get(
    "https://ngarani-api.vercel.app/api/get-name"
  );
  return data.name;
}
const score = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export async function DUMMY_LEADERBOARD(length = 5) {
  const list = [];

  for (let i = 0; i < length; i++) {
    const name = await randomName().then((name) => name);
    list.push({
      name,
      score: score[randomIntFromInterval(0, 10)],
    });
  }
  return list;
}
