import circle from "@/assets/circle.svg";
import { Profile } from "./Profile";
import { Header } from "@/components/Header";
export const Dashboard = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full px-2 overflow-hidden">
      <Header logout />
      <Profile />
      <img
        src={circle}
        alt="circle"
        className="absolute left-0 z-0 object-cover object-center scale-[1.3] opacity-75 -top-12 select-none"
      />
    </div>
  );
};
