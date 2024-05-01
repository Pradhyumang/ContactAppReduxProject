import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./pages.css";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import isUnAuthRouter from "./Router/isUnAuthRouter";
import isAuthRouter from "./Router/isAuthRouter";
// import { getLoginUserId } from "./Storage/storage";
import { Provider, useSelector } from "react-redux";
import { store } from "./Storage/Store";
// const auth = getLoginUserId();
// const auth = useSelector((state) => state.signIn);
// const auth = false;
// const rout = auth ? isAuthRouter : isUnAuthRouter;
const App = () => {
  // Use useSelector to access the Redux store state
  const auth = useSelector((state) => state.signIn);
  const rout = auth.length ? isAuthRouter : isUnAuthRouter;

  return <RouterProvider router={rout}></RouterProvider>;
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={rout} /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
