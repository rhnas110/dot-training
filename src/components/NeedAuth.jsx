export const NeedAuth = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) return (window.location.href = "/");
  const PARSED = JSON.parse(user);
  if (!PARSED?.username?.length) {
    localStorage.removeItem("user");
    return (window.location.href = "/");
  }
  return <>{children}</>;
};
