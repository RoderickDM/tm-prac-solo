import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setIsAdd,
  setIsConfigurationOpen,
} from "../../../../../store/StoreAction";
import Header from "../../../../partials/Header";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Navigation from "../../../../partials/Navigation";
import { getUrlParam } from "../../../../helpers/functions-general";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { FiEdit3 } from "react-icons/fi";
import ModalAddInstallation from "../ModalAddInstallation";
import ModalValidate from "../../../../partials/modals/ModalValidate";
import Toast from "../../../../partials/Toast";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import TableLoading from "../../../../partials/TableLoading";
import ServerError from "../../../../partials/ServerError";

const InstallationInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const installationId = getUrlParam().get("installationId");

  const {
    isLoading,
    isFetching,
    error,
    data: installation,
  } = useQueryData(
    `/v1/controllers/developer/installation/installation.php?installationId=${installationId}`, // endpoint
    "get", // method
    "installation" // key
  );
  console.log("123", installation?.error);

  React.useEffect(() => {
    dispatch(setIsConfigurationOpen(true));
  }, []);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

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
              </div>
              {installation?.error ? (
                <div>
                  <p>PAGE NOT FOUND</p>
                </div>
              ) : (
                <>
                  {isFetching && !isLoading && <TableSpinner />}
                  {(isLoading || installation?.data.length === 0) && (
                    <div className="text-center">
                      {isLoading ? (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="card">
                              <TableLoading count={5} cols={1} />
                            </div>
                            <div className="card">
                              <TableLoading count={5} cols={1} />
                            </div>
                            <div className="card">
                              <TableLoading count={5} cols={1} />
                            </div>
                            <div className="card">
                              <TableLoading count={5} cols={1} />
                            </div>
                            <div className="card">
                              <TableLoading count={5} cols={1} />
                            </div>
                            <div className="card">
                              <TableLoading count={5} cols={1} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>
                          <p>PAGE NOT FOUND</p>
                        </div>
                      )}
                    </div>
                  )}
                  {error ? (
                    <div className="text-center">
                      <ServerError />
                    </div>
                  ) : (
                    <>
                      {installation?.data.map((item, key) => {
                        return (
                          <div
                            className="info_card py-8 px-4 relative"
                            key={key}
                          >
                            <button
                              className="tooltip absolute top-1 right-1"
                              data-tooltip="Edit"
                              onClick={() => handleEdit(item)}
                            >
                              <FiEdit3 />
                            </button>
                            <div className="flex items-center gap-2 text-sm mb-2 truncate">
                              <h4>Title:</h4>
                              <span>{item.installation_title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm truncate">
                              <h4>Description:</h4>
                              <span>{item.installation_description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
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

export default InstallationInfo;
