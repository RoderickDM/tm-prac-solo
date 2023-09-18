import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setIsAdd,
  setIsConfigurationOpen,
} from "../../../../../store/StoreAction";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";

const ConfigurationInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  React.useEffect(() => {
    dispatch(setIsConfigurationOpen(true));
  }, []);
  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={store.isNavigationOpen ? "active" : ""}>
          <Navigation menu="configuration" submenu="configurationSampleOtp" />
        </aside>
        <main className="py-3">
          <div className="container">
            <div className="lg:max-w-[75%]">
              <BreadCrumbs />
              <div className="py-6">
                <div>
                  <h1 className="text-[3rem]">Configuration Info</h1>
                  <div className="flex justify-between items-center"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ConfigurationInfo;
