import React from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import Pills from "../../../partials/Pills.jsx";
import ModalConfirm from "../../../partials/modals/ModalConfirm.jsx";
import ModalDeleteAndRestore from "../../../partials/modals/ModalDeleteAndRestore.jsx";
import Nodata from "../../../partials/NoData.jsx";
import ServerError from "../../../partials/ServerError.jsx";
// import { consoleLog } from "../../../helpers/functions-general.jsx";

const ConfigurationList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 1;
  let active = 0;
  let inactive = 0;

  const {
    isLoading,
    isFetching,
    error,
    data: configList,
  } = useQueryData(
    `/v1/controllers/developer/configuration/configuration.php`, // endpoint
    "get", // method
    "configuration-sampleOtp" // key
  );
  console.log(configList);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.configuration_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.configuration_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.configuration_aid);
    setData(item);
    setDel(true);
  };
  return (
    <>
      <section className="list__grid">
        {isFetching && !isLoading && <TableSpinner />}
        {configList?.data.map((item, key) => {
          return (
            <div className="card" key={key}>
              {(isLoading || configList?.data.length === 0) && (
                <div className="text-center p-12">
                  {isLoading ? <TableSpinner /> : <Nodata />}
                </div>
              )}
              {error && <ServerError />}
              {item.configuration_is_active === 1 ? (
                <ul className="flex justify-end">
                  <li>
                    <button
                      className="tooltip"
                      data-tooltip="Edit"
                      onClick={() => handleEdit(item)}
                    >
                      <FiEdit3 />
                    </button>
                  </li>
                  <li>
                    <button
                      className="tooltip"
                      data-tooltip="Archive"
                      onClick={() => handleArchive(item)}
                    >
                      <FiArchive />
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="flex justify-end">
                  <li>
                    <button
                      className="tooltip"
                      data-tooltip="Delete"
                      onClick={() => handleDelete(item)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </li>
                  <li>
                    <button
                      className="tooltip"
                      data-tooltip="Restore"
                      onClick={() => handleRestore(item)}
                    >
                      <MdRestore />
                    </button>
                  </li>
                </ul>
              )}
              <div className="mx-4">
                <div className="flex items-center gap-2 mb-4 mx-2">
                  <BsFileEarmarkText className="text-lg" />
                  <h3 className="truncate">{item.configuration_title}</h3>
                </div>
                <p className="text-guray text-[.8rem] text-left truncate">
                  {item.configuration_description}
                </p>
              </div>
              <div className="text-center">
                {item.configuration_is_active === 1 ? (
                  <Pills label="ACTIVE" tc="text-success" />
                ) : (
                  <Pills label="INACTIVE" tc="text-archive" />
                )}
              </div>
            </div>
          );
        })}
      </section>

      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/v1/controllers/developer/configuration/active.php?configurationId=${id}`}
          msg={"Are you sure you want to archive this configuration?"}
          item={dataItem.configuration_title}
          queryKey={"configuration-sampleOtp"}
        />
      )}

      {store.isRestore && (
        <ModalDeleteAndRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/controllers/developer/configuration/configuration.php?configurationId=${id}`}
          mysqlApiRestore={`/v1/controllers/developer/configuration/active.php?configurationId=${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this configuration?"
              : "Are you sure you want to restore this configuration?"
          }
          item={dataItem.configuration_title}
          queryKey={"configuration-sampleOtp"}
        />
      )}
    </>
  );
};

export default ConfigurationList;
