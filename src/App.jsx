// import { QueryClient } from "@tanstack/query-core";
// import { QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { devNavUrl } from "./component/helpers/functions-general";
import Configuration from "./component/pages/developer/configuration/Configuration";

function App() {
  // Create a client
  // const queryClient = new QueryClient();
  return (
    <>
      <Router>
        <Routes>
          <Route path={`*`} element={<Configuration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
