import { RiLoginBoxLine } from "react-icons/ri";
import { Tooltip } from "@/components/_ui/Tooltip";
import { trackGAEvent } from "@/utils/googleAnalytics";
import { toastSuccess } from "@/utils/toast";
export const Logout = () => {
  return (
    <Tooltip content="Logout" withArrow className="px-1 text-light">
      <button className="text-light" onClick={handleLogout}>
        <RiLoginBoxLine size={30} />
      </button>
    </Tooltip>
  );
};

export const handleLogout = ({ message }) => {
  localStorage.removeItem("user");
  toastSuccess(message || "Berhasil Logout");
  trackGAEvent("Button", "Click", "Logout");
  setTimeout(() => {
    window.location.href = "/";
  }, 1500);
};
