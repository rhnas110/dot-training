import dot from "@/assets/dot.webp";
import { RiLoginBoxLine } from "react-icons/ri";
import { Tooltip } from "./_ui/Tooltip";
import { Logout } from "./Layouts/Auth/Logout";
import { trackGAEvent } from "@/utils/googleAnalytics";
export const Header = ({ logout }) => {
  return (
    <div className="absolute top-0 z-10 flex items-center justify-between w-full px-4 py-8">
      <div className="flex items-center select-none">
        <img src={dot} alt="dot" className="w-32" />
      </div>
      {logout ? (
        <Logout />
      ) : (
        <Tooltip content="Dashboard" withArrow className="px-1 text-light">
          <a
            className="text-light"
            href="/dashboard"
            onClick={() => trackGAEvent("Button", "Click", "Dashboard")}
          >
            <RiLoginBoxLine size={30} />
          </a>
        </Tooltip>
      )}
    </div>
  );
};
