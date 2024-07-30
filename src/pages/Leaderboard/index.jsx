import { useEffect } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { Leaderboard as LeaderboardLayouts } from "@/components/Layouts/Leaderboard";
import { initializeGA, ReactGA } from "@/utils/googleAnalytics";
export const Leaderboard = () => {
  useEffect(() => {
    initializeGA();
    ReactGA.send({
      hitType: "pageview",
      page: "/leaderboard",
      title: "Leaderboard",
    });
  }, []);
  return (
    <PageWrapper className="h-screen px-0 bg-primary-700">
      <LeaderboardLayouts />
    </PageWrapper>
  );
};
