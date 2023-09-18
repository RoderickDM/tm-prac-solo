import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setIsAdd,
  setIsConfigurationOpen,
} from "../../../../../store/StoreAction";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import { getUrlParam } from "../../../../helpers/functions-general";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { FiEdit3 } from "react-icons/fi";
import ModalAddInstallation from "../../installation/ModalAddInstallation";
import ModalValidate from "../../../../partials/modals/ModalValidate";
import Toast from "../../../../partials/Toast";
import ModalAddConfiguration from "../ModalAddConfiguration";

const ConfigurationInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const configurationId = getUrlParam().get("configurationId");
  const {
    isLoading,
    isFetching,
    error,
    data: configurationList,
  } = useQueryData(
    `/v1/controllers/developer/configuration/configuration.php?configurationId=${configurationId}`, // endpoint
    "get", // method
    "configuration" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
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
                </div>
                {configurationList?.data.map((item, key) => {
                  return (
                    <div className="info_card py-8 px-4 relative" key={key}>
                      <button
                        className="tooltip absolute top-1 right-1"
                        data-tooltip="Edit"
                        onClick={() => handleEdit(item)}
                      >
                        <FiEdit3 />
                      </button>
                      <div className="flex items-center gap-2 text-sm mb-2 truncate">
                        <h4>Title:</h4>
                        <span>{item.configuration_title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm truncate">
                        <h4>Description:</h4>
                        <span>{item.configuration_description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
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

export default ConfigurationInfo;
