import React from "react";
import {
  setIsAdd,
  setIsConfigurationOpen,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import Toast from "../../../partials/Toast";
import ModalValidate from "../../../partials/modals/ModalValidate";
import InstallationList from "./InstallationList";
import ModalAddInstallation from "./ModalAddInstallation";

const Installation = () => {
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
          <Navigation menu="installation" />
        </aside>
        <main className="py-3">
          <div className="container">
            <div className="lg:max-w-[75%]">
              <BreadCrumbs />
              <div className="py-6">
                <div>
                  <h1 className="text-[3rem]">Installation</h1>
                  <div className="flex justify-between items-center">
                    <p className="pt-4">
                      How to install ParrotOS on your computer? Follow these
                      guides step by step.
                    </p>
                    <button
                      className="btn btn--accent btn--sm"
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <InstallationList setItemEdit={setItemEdit} />
            </div>
          </div>
        </main>
      </section>

      {store.isAdd && <ModalAddInstallation itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}

      {store.success && <Toast />}
    </>
  );
};

export default Installation;
