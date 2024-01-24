import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastrar",
    element: <Register />,
  },
]);
