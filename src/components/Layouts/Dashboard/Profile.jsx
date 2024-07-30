import { useEffect, useState } from "react";

import { Avatar } from "./Avatar";
import { Tooltip } from "@/components/_ui/Tooltip";
import { trackGAEvent } from "@/utils/googleAnalytics";
import { getCategory } from "@/vendor/api/question";
import { cn } from "@/utils";
export const Profile = () => {
  const { username } = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="relative flex items-center justify-center w-full h-[60%]">
      <Avatar />
      <div className="relative z-10 w-full h-full px-2 py-10 overflow-y-auto rounded-tr-none rounded-br-none shadow rounded-3xl bg-light scrollbar-primary">
        <div className="flex items-center justify-center font-semibold gap-x-2">
          <Tooltip
            content={username}
            className="z-10 max-w-60 text-light"
            withArrow
          >
            <h3 className="text-2xl truncate cursor-default">{username}</h3>
          </Tooltip>
        </div>

        <Stage />
      </div>
    </div>
  );
};

const Stage = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const CATEGORY = await getCategory().then((res) => res);
      setCategory(CATEGORY.sort((a, b) => a.name.localeCompare(b.name)));
    };
    getData();
  }, []);
  return (
    <div className="w-full px-2 mt-4">
      <h3 className="text-xl font-semibold">Stage</h3>
      <div className="flex flex-col mt-2 gap-y-2">
        {category?.length ? (
          category?.map((item) => {
            const isCompleted =
              localStorage.getItem(`score-${item.id}`) !== null;
            return (
              <a
                key={item.id}
                className={cn(
                  "py-2 text-center rounded-full text-light bg-primary-600 hover:bg-primary-700",
                  {
                    "opacity-80 line-through": isCompleted,
                  }
                )}
                href={
                  isCompleted ? `/leaderboard/${item.id}` : `/quiz/${item.id}`
                }
                title={isCompleted ? "Selesai" : ""}
                onClick={() => {
                  if (isCompleted)
                    trackGAEvent("Stage", "Finished", `Stage ${item.name}`);
                  else trackGAEvent("Stage", "Start", `Stage ${item.name}`);
                }}
              >
                {item.name}
              </a>
            );
          })
        ) : (
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-12 h-12 border-t-4 border-b-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-b-4 rounded-full border-primary-600 animate-spin"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
