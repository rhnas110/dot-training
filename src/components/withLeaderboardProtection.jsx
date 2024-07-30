import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const withLeaderboardProtection = (Component) => {
  const WrappedComponent = (props) => {
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const isFinished = localStorage.getItem(`score-${category}`);
      if (!isFinished) {
        navigate("/dashboard");
        return;
      }
    }, [category, navigate]);

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withLeaderboardProtection(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withLeaderboardProtection;
