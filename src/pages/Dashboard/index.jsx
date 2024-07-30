import { useEffect } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { Dashboard as DashboardLayouts } from "@/components/Layouts/Dashboard";
import { initializeGA, ReactGA } from "@/utils/googleAnalytics";
export const Dashboard = () => {
  const onStorageUpdate = (e) => {
    const { key } = e;
    // when localstorage with key news updated, will refresh
    if (key === "user") {
      window.location.reload(true);
    }
  };
  // sync between open tabs
  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);
  useEffect(() => {
    initializeGA();
    ReactGA.send({
      hitType: "pageview",
      page: "/dashboard",
      title: "Dashboard",
    });
  }, []);
  return (
    <PageWrapper className="h-screen px-0 bg-primary-700">
      <DashboardLayouts />
    </PageWrapper>
  );
};
