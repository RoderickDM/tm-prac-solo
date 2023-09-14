import { useInfiniteQuery } from "@tanstack/react-query";
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
import { queryDataInfinite } from "../../../helpers/queryDataInfinite.jsx";
import Nodata from "../../../partials/NoData.jsx";
import Pills from "../../../partials/Pills.jsx";
import SearchBar from "../../../partials/SearchBar.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import ModalConfirm from "../../../partials/modals/ModalConfirm.jsx";
import ModalDeleteAndRestore from "../../../partials/modals/ModalDeleteAndRestore.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import Loadmore from "../../../partials/Loadmore.jsx";
// import { consoleLog } from "../../../helpers/functions-general.jsx";

const ConfigurationList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef(null);
  const { ref, inView } = useInView();
  // let counter = 1;
  // let active = 0;
  // let inactive = 0;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["configuration-sampleOtp", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/configuration/search.php`, // search endpoint
        `/v1/controllers/developer/configuration/page.php?start=${pageParam}`, // list endpoint
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
    refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  console.log("123", result, isFetchingNextPage, hasNextPage, isFetching);
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
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />
      <section className="list__grid">
        {isFetching && status !== "loading" && <TableSpinner />}
        {(status == "loading" || result?.pages[0].data.length === 0) && (
          <div className="text-center">
            {status === "loading" ? <TableSpinner /> : <Nodata />}
          </div>
        )}
        {error && (
          <div className="text-center">
            <ServerError />
          </div>
        )}
        {result?.pages.map((page, key) => (
          <React.Fragment key={key}>
            {page.data.map((item, key) => {
              return (
                <div className="card" key={key}>
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
          </React.Fragment>
        ))}
      </section>
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
