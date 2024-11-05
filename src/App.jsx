import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";
import { configWeb3Modal } from "./connection";

configWeb3Modal()

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<Home />} />
    <Route path="/dashboard" element={<Layout />}>
      <Route index element={<Dashboard />} />
    </Route>
  </Route>));

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-openSans">
          <RouterProvider router={router} />
    </div>
  )
};

export default App;