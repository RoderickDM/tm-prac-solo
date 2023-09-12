import React from "react";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import ConfigurationList from "./ConfigurationList";
import { setIsConfigurationOpen } from "../../../../store/StoreAction";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import ModalAddConfiguration from "./ModalAddConfiguration";

const Configuration = () => {
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
        <aside>
          <Navigation menu="configuration" submenu="configurationSampleOtp" />
        </aside>
        <main className="py-3">
          <div className="container">
            <div className="lg:max-w-[75%]">
            <BreadCrumbs />
          <div className="py-6 mr-3 flex items-center justify-between">
            <div>
              <h1 className="text-[3rem]">Configuration</h1>
              <p className="pt-4">Some basics for managing your OS</p>
            </div>
            <button className="btn btn--accent btn--sm" onClick={handleAdd}>
              Add
            </button>
          </div>
          <ConfigurationList setItemEdit={setItemEdit} />
          </div>    
            </div>   
        </main>
      </section>

      {store.isAdd && <ModalAddConfiguration itemEdit={itemEdit} />}
    </>
  );
};

export default Configuration;
