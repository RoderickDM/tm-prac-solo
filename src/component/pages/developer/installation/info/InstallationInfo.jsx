import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setIsAdd,
  setIsConfigurationOpen,
} from "../../../../../store/StoreAction";
import Header from "../../../../partials/Header";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Navigation from "../../../../partials/Navigation";
import InstallationInfoList from "./InstallationInfoList";

const InstallationInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    dispatch(setIsConfigurationOpen(true));
  }, []);
  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={store.isNavigationOpen ? "active" : ""}>
          <Navigation menu="installation" />
        </aside>
        <main className="py-3">
          <div className="container">
            <div className="lg:max-w-[75%]">
              <BreadCrumbs />
              <div className="py-6">
                <div>
                  <h1 className="text-[3rem]">Installation Info</h1>
                </div>
                <div>
                  <InstallationInfoList />
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default InstallationInfo;
