import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/PageWrapper";
import { Auth as AuthLayouts } from "@/components/Layouts/Auth";
export const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) return navigate("/dashboard");
  }, [navigate]);
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
  return (
    <PageWrapper className="h-screen px-0 bg-primary-700">
      <AuthLayouts />
    </PageWrapper>
  );
};
