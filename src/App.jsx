import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { devNavUrl } from "./component/helpers/functions-general";
import Cloud from "./component/pages/developer/cloud/Cloud";
import Configuration from "./component/pages/developer/configuration/Configuration";
import ConfigurationInfo from "./component/pages/developer/configuration/info/ConfigurationInfo";
import Installation from "./component/pages/developer/installation/Installation";
import InstallationInfo from "./component/pages/developer/installation/info/InstallationInfo";
import Tools from "./component/pages/developer/tools/Tools";
import ToolsInfoList from "./component/pages/developer/tools/info-list/ToolsInfoList";
import { StoreProvider } from "./store/StoreContext";
import ToolsInfo from "./component/pages/developer/tools/info/ToolsInfo";
import ToolsEngagement from "./component/pages/developer/tools/engagement/ToolsEngagement";

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
              path={`/${devNavUrl}/configuration`}
              element={<Configuration />}
            />
            <Route
              path={`/${devNavUrl}/configuration/information`}
              element={<ConfigurationInfo />}
            />
            <Route
              path={`/${devNavUrl}/installation`}
              element={<Installation />}
            />
            <Route
              path={`/${devNavUrl}/installation/information`}
              element={<InstallationInfo />}
            />
            <Route path={`/${devNavUrl}/tools`} element={<Tools />} />
            <Route
              path={`/${devNavUrl}/tools/list`}
              element={<ToolsInfoList />}
            />
            <Route
              path={`/${devNavUrl}/tools/list/information`}
              element={<ToolsInfo />}
            />
            <Route
              path={`/${devNavUrl}/tools/list/engagement`}
              element={<ToolsEngagement />}
            />
            <Route path={`/${devNavUrl}/cloud`} element={<Cloud />} />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
