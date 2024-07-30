import { useEffect } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { Quiz as QuizLayouts } from "@/components/Layouts/Quiz";
import { initializeGA, ReactGA } from "@/utils/googleAnalytics";
export const Quiz = () => {
  useEffect(() => {
    initializeGA();
    ReactGA.send({
      hitType: "pageview",
      page: "/quiz",
      title: "Quiz",
    });
  }, []);
  return (
    <PageWrapper className="h-screen px-0 bg-primary-100">
      <QuizLayouts />
    </PageWrapper>
  );
};
