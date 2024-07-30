import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "@/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
    <ToastContainer />
  </Router>
);
