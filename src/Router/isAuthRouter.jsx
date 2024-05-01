import { createBrowserRouter } from "react-router-dom";
import ContactList from "../Component/ContactList";
// import App from "./../App";

const isAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <ContactList />,
  },
  {
    path: "*",
    element: <>404 Error Page Not Found</>,
  },
]);

export default isAuthRouter;
