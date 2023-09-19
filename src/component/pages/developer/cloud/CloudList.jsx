import React from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import Nodata from "../../../partials/NoData.jsx";
import Pills from "../../../partials/Pills.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import TableLoading from "../../../partials/TableLoading.jsx";
import ModalConfirm from "../../../partials/modals/ModalConfirm.jsx";
import ModalDeleteAndRestore from "../../../partials/modals/ModalDeleteAndRestore.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
// import { consoleLog } from "../../../helpers/functions-general.jsx";

const CloudList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const search = React.useRef(null);
  // let counter = 1;
  // let active = 0;
  // let inactive = 0;

  const {
    isLoading,
    isFetching,
    error,
    data: cloudList,
  } = useQueryData(
    "/v1/controllers/developer/cloud/cloud.php", // endpoint
    "get", // method
    "cloud" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.cloud_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.cloud_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.cloud_aid);
    setData(item);
    setDel(true);
  };
  return (
    <>
      {isFetching && isLoading && <TableSpinner />}
      {(isLoading || cloudList?.data.length === 0) && (
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
            <Nodata />
          )}
        </div>
      )}
      {error && (
        <div className="text-center">
          <ServerError />
        </div>
      )}
      <div className="list__grid">
        {cloudList?.data.map((item, key) => {
          return (
            <>
              <div className="card" key={key}>
                {item.cloud_is_active === 1 ? (
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
                    <h3 className="truncate">{item.cloud_title}</h3>
                  </div>
                  <p className="text-guray text-[.8rem] text-left truncate">
                    {item.cloud_description}
                  </p>
                </div>
                <div className="text-center">
                  {item.cloud_is_active === 1 ? (
                    <Pills label="ACTIVE" tc="text-success" />
                  ) : (
                    <Pills label="INACTIVE" tc="text-archive" />
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>

      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/v1/controllers/developer/cloud/active.php?cloudId=${id}`}
          msg={"Are you sure you want to archive this cloud?"}
          item={dataItem.cloud_title}
          queryKey={"cloud"}
        />
      )}

      {store.isRestore && (
        <ModalDeleteAndRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/controllers/developer/cloud/cloud.php?cloudId=${id}`}
          mysqlApiRestore={`/v1/controllers/developer/cloud/active.php?cloudId=${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this cloud?"
              : "Are you sure you want to restore this cloud?"
          }
          item={dataItem.cloud_title}
          queryKey={"cloud"}
        />
      )}
    </>
  );
};

export default CloudList;
