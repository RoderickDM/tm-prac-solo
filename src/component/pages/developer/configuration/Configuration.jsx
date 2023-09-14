import React from "react";
import {
  setIsAdd,
  setIsConfigurationOpen,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ConfigurationList from "./ConfigurationList";
import ModalAddConfiguration from "./ModalAddConfiguration";
import ModalValidate from "../../../partials/modals/ModalValidate";
import Toast from "../../../partials/Toast";

const Configuration = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
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
                  <h1 className="text-[3rem]">Configuration</h1>
                  <div className="flex justify-between items-center">
                    <p className="pt-4">Some basics for managing your OS</p>
                    <button
                      className="btn btn--accent btn--sm"
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <ConfigurationList setItemEdit={setItemEdit} />
            </div>
          </div>
        </main>
      </section>

      {store.isAdd && <ModalAddConfiguration itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}

      {store.success && <Toast />}
    </>
  );
};

export default Configuration;
