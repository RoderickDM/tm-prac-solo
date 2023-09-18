import React from "react";
import { FiEdit3 } from "react-icons/fi";
import {
  setIsAdd,
  setIsConfirm,
  setIsEdit,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import ModalValidate from "../../../../partials/modals/ModalValidate";
import Toast from "../../../../partials/Toast";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import TableLoading from "../../../../partials/TableLoading";
import Nodata from "../../../../partials/NoData";
import { useInfiniteQuery } from "@tanstack/react-query";
import ServerError from "../../../../partials/ServerError";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import ModalAddInstallation from "../ModalAddInstallation";

const InstallationInfoList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  //error 1
  const installationId = getUrlParam().get("installationId");

  const {
    isLoading,
    isFetching,
    error,
    data: installationView,
  } = useQueryData(
    `/v1/controllers/developer/installation/installation.php?installationId=${installationId}`, // endpoint
    "get", // method
    "installation"
  );

  const handleEdit = (item) => {
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };
  return (
    <>
      {isFetching && !isLoading && <TableSpinner />}
      {(isLoading || installationView?.data.length === 0) && (
        <div>
          {isLoading ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <TableLoading count={5} cols={1} />
                </div>
                <div>
                  <TableLoading count={5} cols={1} />
                </div>
                <div>
                  <TableLoading count={5} cols={1} />
                </div>
                <div>
                  <TableLoading count={5} cols={1} />
                </div>
                <div>
                  <TableLoading count={5} cols={1} />
                </div>
                <div>
                  <TableLoading count={5} cols={1} />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <Nodata />
            </div>
          )}
        </div>
      )}
      {installationView?.count > 0 && !error ? (
        <div className="text-center">
          <ServerError />
        </div>
      ) : (
        <>
          {installationView?.data.map((item, key) => (
            <div className="info_card p-8 relative " key={key}>
              <div className="absolute right-1 top-1">
                <button
                  className="tooltip"
                  data-tooltip="Edit"
                  onClick={() => handleEdit(item)}
                >
                  <FiEdit3 />
                </button>
              </div>
              <div className="flex items-center gap-2 my-2">
                <h4>Title:</h4>
                <span>{item.installation_title}</span>
              </div>
              <div className=" flex items-center gap-2">
                <h4>Description:</h4>
                <span>{item.installation_description}</span>
              </div>
            </div>
          ))}
        </>
      )}

      {store.isAdd && <ModalAddInstallation itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}
      {store.success && <Toast />}
    </>
  );
};

export default InstallationInfoList;
