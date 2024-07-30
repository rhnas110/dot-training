import { Avatar } from "../Dashboard/Avatar";
import { Tooltip } from "@/components/_ui/Tooltip";
export const Rank = ({ rank, category, username }) => {
  const score = parseInt(localStorage.getItem(`score-${category}`));
  return (
    <div className="relative flex items-center justify-center w-full px-4">
      <Avatar />
      <div className="w-full h-full px-2 py-10 overflow-y-auto rounded-br-none shadow-md rounded-3xl bg-light scrollbar-primary">
        <div className="flex items-center justify-center font-semibold gap-x-2">
          <Tooltip
            content={username}
            className="z-10 max-w-60 text-light"
            withArrow
          >
            <h3 className="text-2xl truncate cursor-default">
              {username || "?"}
            </h3>
          </Tooltip>
          <span className="flex-shrink-0 text-primary-700">
            ({score || "0"} Poin)
          </span>
        </div>
        <div className="w-40 mx-auto select-none">
          <img
            src="https://png.pngtree.com/png-clipart/20220509/original/pngtree-beautiful-golden-trophy-cups-and-awards-of-different-shape-realistic-set-png-image_7690961.png"
            alt="Trophy"
            loading="lazy"
          />
          <h3 className="text-xl font-semibold text-center">
            Ranking {rank || "?"}
          </h3>
        </div>
      </div>
    </div>
  );
};
