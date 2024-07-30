import ReactGA from "react-ga4";
const TRACKING_ID = "G-H6Y9HS8Y6Y";

const initializeGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

const trackGAEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export { initializeGA, trackGAEvent, ReactGA };
