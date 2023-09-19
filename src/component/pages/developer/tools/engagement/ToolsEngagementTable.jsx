import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import { StoreContext } from "../../../../../store/StoreContext";
import SearchBar from "../../../../partials/SearchBar";
import TableLoading from "../../../../partials/TableLoading";
import Loadmore from "../../../../partials/Loadmore";
import Pills from "../../../../partials/Pills";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction";
import { getUrlParam } from "../../../../helpers/functions-general";
import ServerError from "../../../../partials/ServerError";
import Nodata from "../../../../partials/NoData";

// import SearchBar from "../../../partials/SearchBar.jsx";
// import TableLoading from "../../../partials/TableLoading.jsx";
// import Nodata from "../../../partials/NoData.jsx";
// import ServerError from "../../../partials/ServerError.jsx";
// import Pills from "../../../partials/Pills.jsx";
// import Loadmore from "../../../partials/Loadmore.jsx";
// import { StoreContext } from "../../../../store/StoreContext.jsx";
// import {
//   setIsAdd,
//   setIsConfirm,
//   setIsRestore,
// } from "../../../../store/StoreAction.jsx";
// import { queryDataInfinite } from "../../../helpers/queryDataInfinite.jsx";
// import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";

const ToolsEngagementTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  const { ref, inView } = useInView();
  const toolsId = getUrlParam().get("toolsId");

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
    queryKey: ["tools-engagement", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/tools/info/list/engagement/search.php`, // search endpoint
        `/v1/controllers/developer/tools/info/list/engagement/page.php?start=${pageParam}`, // list endpoint // list endpoint
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
    setId(item.tools_engagement_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.tools_engagement_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.tools_engagement_aid);
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
              <th>Engagement ID</th>
              <th>Name</th>
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
                  active += item.tools_engagement_is_active === 1;
                  inactive += item.tools_engagement_is_active === 0;
                  return (
                    <tr key={key}>
                      <td>{counter++}.</td>
                      <td>
                        {item.tools_engagement_is_active === 1 ? (
                          <Pills label="Active" bgc="bg-success" />
                        ) : (
                          <Pills label="Inactive" bgc="bg-archive" />
                        )}
                      </td>
                      <td>{item.tools_engagement_id}</td>
                      <td>{item.tools_engagement_name}</td>
                      <td>{item.tools_engagement_description}</td>

                      <td
                        className="table__action top-0 right-5 "
                        data-ellipsis=". . ."
                      >
                        {item.tools_engagement_is_active === 1 ? (
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
          mysqlApiArchive={`/v1/controllers/developer/tools/info/list/engagement/active.php?toolsEngagementId=${id}`}
          msg={"Are you sure you want to archive this engagement?"}
          item={dataItem.tools_engagement_name}
          queryKey={"tools-engagement"}
        />
      )}

      {store.isRestore && (
        <ModalDeleteAndRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/controllers/developer/tools/info/list/engagement/engagement.php?toolsEngagementId=${id}`}
          mysqlApiRestore={`/v1/controllers/developer/tools/info/list/engagement/active.php?toolsEngagementId=${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this engagement?"
              : "Are you sure you want to restore this engagement?"
          }
          item={dataItem.tools_engagement_name}
          queryKey={"tools-engagement"}
        />
      )}
    </>
  );
};

export default ToolsEngagementTable;
