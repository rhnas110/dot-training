import { useEffect } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { initializeGA, ReactGA, trackGAEvent } from "@/utils/googleAnalytics";
export const NotFound = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
      trackGAEvent("Redirect", "Otomatis", "/");
    }, 10000);

    return () => {};
  }, []);
  useEffect(() => {
    initializeGA();
    ReactGA.send({
      hitType: "pageview",
      page: "/404",
      title: "404",
    });
  }, []);
  return (
    <PageWrapper className="h-screen px-0 bg-primary-100">
      <div className="flex flex-col items-center justify-center h-full text-[#D2A586] gap-y-2">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/027/505/213/small_2x/kawaii-cat-cartoon-clip-art-png.png"
          alt="Not Found"
          loading="lazy"
          className="w-64 select-none aspect-square"
        />
        <div className="text-center">
          <h1 className="text-lg font-bold">Wahhh... kamu nyawsar,</h1>
          <div className="flex items-center justify-center gap-x-2">
            <p>Yuu pulang yuu</p>
            <a
              href="/"
              className="flex items-center justify-center gap-1"
              onClick={() => trackGAEvent("Redirect", "Click", "/")}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/016/326/274/original/cat-lover-cute-kitten-kitty-cat-paw-free-png.png"
                alt="Paws"
                loading="lazy"
                className="w-10 select-none aspect-square"
              />
              <img
                src="https://static.vecteezy.com/system/resources/previews/016/326/274/original/cat-lover-cute-kitten-kitty-cat-paw-free-png.png"
                alt="Paws"
                loading="lazy"
                className="w-10 select-none aspect-square"
              />
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
