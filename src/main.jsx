import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./Storage/Store";
import "./index.css";
import "./pages.css";
import isUnAuthRouter from "./Router/isUnAuthRouter";
import isAuthRouter from "./Router/isAuthRouter";

const App = () => {
  const auth = useSelector((state) => state.signIn);
  const rout = auth.length ? isAuthRouter : isUnAuthRouter;

  return <RouterProvider router={rout}></RouterProvider>;
};

// Create the root outside of the component
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app inside the root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
