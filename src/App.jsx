import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";
import { config } from "./constants/config";
import { WagmiProvider } from "wagmi";
import { configWeb3Modal } from "./connection";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

configWeb3Modal()

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<Home />} />
    <Route path="/dashboard" element={<Layout />}>
      <Route index element={<Dashboard />} />
    </Route>
  </Route>));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-openSans">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
};

export default App;