import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/home-page";
import HowToUse from "@/pages/how-to-use/how-to-use";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/how-to-use",
    element: <HowToUse />,
  },
]);