import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import SignUp from "../Component/SignUp";
import SignIn from "../Component/SignIn";
import HomeUnAuth from "../Component/HomeUnAuth";
const isUnAuthRouter = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <HomeUnAuth />,
  },
  {
    path: "*",
    element: <>404 Error Page Not Found</>,
  },
]);
export default isUnAuthRouter;
