import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { devNavUrl } from "./component/helpers/functions-general";
import Configuration from "./component/pages/developer/configuration/Configuration";
import { StoreProvider } from "./store/StoreContext";
import Installation from "./component/pages/developer/installation/Installation";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path={`*`} element={<Configuration />} />
            <Route
              path={`/${devNavUrl}/configuration/sample-otp`}
              element={<Configuration />}
            />
            <Route
              path={`/${devNavUrl}/installation`}
              element={<Installation />}
            />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
