import circle from "@/assets/circle.svg";
import dot from "@/assets/dot.webp";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { trackGAEvent } from "@/utils/googleAnalytics";
import { toastError, toastSuccess } from "@/utils/toast";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, {
      message: "Maksimal 50 karakter",
    })
    .trim(),
});
export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  function onSubmit(data) {
    try {
      if (!data.username) throw new Error("Username harus diisi");
      localStorage.setItem("user", JSON.stringify(data));
      toastSuccess("Berhasil login");
      trackGAEvent("Form Submit", "Submit", "Login");
      trackGAEvent("Form Submit", "Submit", `User ${data.username}`);
      return navigate("/dashboard");
    } catch (error) {
      toastError(error.message);
    }
  }
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Background />
      <Header />
      <div className="absolute bottom-0 w-full max-w-sm px-4 py-8 overflow-y-auto bg-light rounded-t-3xl scrollbar-primary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 rounded-md shadow appearance-none bg-[#EEECEC] focus:outline-primary-600 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Masukkan Username Anda"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="text-red-500">{errors.username?.message}</p>
            )}
          </div>
          <button
            className="w-full py-2 mt-8 rounded-md select-none bg-primary-600 text-light hover:bg-primary-700"
            type="submit"
            onClick={() => trackGAEvent("Form Submit", "Click", "Login")}
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

function Header() {
  return (
    <div className="relative z-10 flex items-center justify-center py-40 select-none gap-x-2">
      <img src={dot} alt="Logo" className="w-8/12" />
    </div>
  );
}

function Background() {
  return (
    <div className="relative w-full select-none">
      <img
        src={circle}
        alt="cicle-center"
        className="absolute z-0 object-cover object-center scale-[1.3] opacity-75 top-2.5 -left-28"
      />
      <img
        src={circle}
        alt="cicle-top-right"
        className="absolute z-0 object-cover object-center opacity-50 -top-24 -right-24 w-60"
      />
      <img
        src={circle}
        alt="cicle-bottom-right"
        className="absolute right-0 z-0 object-cover object-center w-40 opacity-75 top-72"
      />
      <img
        src={circle}
        alt="cicle-bottom-left"
        className="absolute z-0 object-cover object-center opacity-75 top-96"
      />
    </div>
  );
}
