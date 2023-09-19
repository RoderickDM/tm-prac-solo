import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";

import SearchBar from "../../../partials/SearchBar.jsx";
import TableLoading from "../../../partials/TableLoading.jsx";
import Nodata from "../../../partials/NoData.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import Pills from "../../../partials/Pills.jsx";
import Loadmore from "../../../partials/Loadmore.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";

const ToolsTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  const { ref, inView } = useInView();

  let counter = 1;
  let active = 0;
  let inactive = 0;

  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["installation", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/installation/search.php`, // search endpoint
        `/v1/controllers/developer/installation/page.php?start=${pageParam}`, // list endpoint // list endpoint
        store.isSearch, // search boolean
        "post",
        { search: search.current.value }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: true,
    // networkMode: "always",
    // cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

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
      <SearchBar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
      />

      <div className="table__wrapper relative rounded-md shadow-md overflow-auto mb-8">
        {isFetching && status !== "loading" && <TableSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Title</th>
              <th>Description</th>
              <th className="action lg:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {status === "loading" ? (
                    <TableLoading count={20} cols={3} />
                  ) : (
                    <Nodata />
                  )}
                </td>
              </tr>
            )}

            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => {
                  active += item.configuration_is_active === 1;
                  inactive += item.configuration_is_active === 0;
                  return (
                    <tr key={key}>
                      <td>{counter++}.</td>
                      <td>
                        {item.configuration_is_active === 1 ? (
                          <Pills label="Active" bgc="bg-success" />
                        ) : (
                          <Pills label="Inactive" bgc="bg-archive" />
                        )}
                      </td>
                      <td>{item.configuration_title}</td>
                      <td>{item.configuration_description}</td>

                      <td
                        className="table__action top-0 right-5 "
                        data-ellipsis=". . ."
                      >
                        {item.configuration_is_active === 1 ? (
                          <ul className=" flex items-center  gap-4 bg-">
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
                          <ul className="flex items-center gap-4">
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
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="loadmore flex justify-center flex-col items-center my-5">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
          />
        </div>
      </div>

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

export default ConfigurationTable;
