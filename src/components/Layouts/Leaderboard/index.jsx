import circle from "@/assets/circle.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Rank } from "./Rank";
import { Header } from "@/components/Header";
import { DUMMY_LEADERBOARD } from "@/utils";
import { getCategory } from "@/vendor/api/question";
import { toastInfo } from "@/utils/toast";

const MEDAL = [
  "https://png.pngtree.com/png-clipart/20220718/ourmid/pngtree-gold-rosette-award-png-image_6005518.png",
  "https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-silver-medal-icon-illustration-design-success-background-vector-png-image_32572992.png",
  "https://png.pngtree.com/png-vector/20230124/ourmid/pngtree-champion-bronze-award-medals-with-red-ribbons-png-image_6564729.png",
];

export const Leaderboard = () => {
  const { username } = JSON.parse(localStorage.getItem("user"));
  const { category } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const loadLeaderboard = async () => {
      const score = parseInt(localStorage.getItem(`score-${category}`));

      const dummyLeaderboard = await DUMMY_LEADERBOARD(10);
      const updatedLeaderboard = [
        ...dummyLeaderboard,
        {
          name: username,
          score: score,
        },
      ];

      // Sort the leaderboard from highest to lowest score
      updatedLeaderboard.sort((a, b) => b.score - a.score);
      setLeaderboard(updatedLeaderboard);
    };
    loadLeaderboard();

    const getCategoryName = async () => {
      const CATEGORY = await getCategory().then((res) => res);
      const categoryName = CATEGORY.find(
        (item) => item.id === parseInt(category)
      );
      setCategoryName(categoryName?.name);
      toastInfo(`Kamu telah menyelesaikan Stage ${categoryName?.name}!`);
    };
    getCategoryName();
  }, [category]);

  const RANK = leaderboard.findIndex((entry) => entry.name === username) + 1;
  return (
    <div
      className="relative flex flex-col items-center w-full h-full pt-40 pb-8 overflow-x-hidden overflow-y-auto scrollbar-primary"
      id="leaderboard"
    >
      <img
        src={circle}
        alt="circle"
        className="absolute left-0 z-0 object-cover object-center scale-[1.3] opacity-75 -top-10 select-none"
      />
      <Header />
      <Rank rank={RANK} category={category} username={username} />
      <div className="my-8 bg-[#FFD54B] w-full p-4 flex justify-center">
        <h3>
          <span className="font-bold">Info:</span> Anda telah menyelesaikan
          Stage {categoryName || "?"}, selesaikan Stage lainnya untuk
          mendapatkan keseruan!
        </h3>
      </div>
      <div className="w-full px-4">
        <h3 className="mb-4 text-lg font-bold text-light">
          Leaderboard - Stage {categoryName || "?"}
        </h3>
        <ul>
          {leaderboard.length ? (
            leaderboard.map((entry, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-4 rounded-lg shadow-md bg-light"
              >
                <div className="flex items-center justify-between px-4 py-5 gap-x-2">
                  <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 p-3 text-gray-400 border-2 border-gray-400 rounded-full select-none opacity-70">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://avatar.iran.liara.run/public"
                      alt={"Profile" + index}
                      className="w-12 h-12 rounded-full select-none bg-primary-400"
                    />
                    <div>
                      <div className="flex items-center font-semibold gap-x-1">
                        <p>{entry.name}</p>
                        {entry.name === username && (
                          <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 overflow-hidden rounded-full">
                            <img
                              src="https://www.freeiconspng.com/uploads/leaderboard-icon-11.png"
                              alt="You"
                              className="object-cover object-center w-full h-full select-none"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400">{entry.score} points</p>
                    </div>
                  </div>
                </div>
                {index < 3 && (
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 overflow-hidden rounded-full">
                    <img
                      src={MEDAL[index]}
                      alt={"Medal" + index}
                      className="object-cover object-center w-full h-full select-none"
                    />
                  </div>
                )}
              </li>
            ))
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full animate-pulse bg-light"></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-light"></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-light"></div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
