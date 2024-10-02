import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { configWallet } from "./connection";
configWallet();

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
    </Route>));

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-openSans">
        <RouterProvider router={router} />
    </div>
  )
};

export default App;
