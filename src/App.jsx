import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { NeedAuth } from "@/components/NeedAuth";
import withQuizProtection from "@/components/withQuizProtection";
import withLeaderboardProtection from "@/components/withLeaderboardProtection";

import { Auth } from "@/pages/Auth";
import { Dashboard } from "@/pages/Dashboard";
import { Quiz } from "@/pages/Quiz";
import { Leaderboard } from "@/pages/Leaderboard";
import { NotFound } from "@/pages/NotFound/NotFound";

import { initializeGA, ReactGA } from "@/utils/googleAnalytics";

const ProtectedQuiz = withQuizProtection(Quiz);
const ProtectedLeaderboard = withLeaderboardProtection(Leaderboard);
function App() {
  useEffect(() => {
    initializeGA();
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Home",
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <NeedAuth>
            <Dashboard />
          </NeedAuth>
        }
      />
      <Route
        path="/quiz/:category"
        element={
          <NeedAuth>
            <ProtectedQuiz />
          </NeedAuth>
        }
      />
      <Route
        path="/leaderboard/:category"
        element={
          <NeedAuth>
            <ProtectedLeaderboard />
          </NeedAuth>
        }
      />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
