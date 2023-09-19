import React from "react";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import { StoreContext } from "../../../../../store/StoreContext";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { devNavUrl, getUrlParam } from "../../../../helpers/functions-general";

const ToolsInfoList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const toolsId = getUrlParam().get("toolsId");

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={store.isNavigationOpen ? "active" : ""}>
          <Navigation menu="tools" />
        </aside>
        <main className="py-3">
          <div className="container">
            <div className="lg:max-w-[75%]">
              <BreadCrumbs />
              <div className="py-6">
                <div>
                  <h1 className="text-[3rem]">Tools</h1>
                </div>
              </div>
              <ul>
                <Link
                  to={`${devNavUrl}/tools/list/information?toolsId=${toolsId}`}
                >
                  <li className="border-b-2 border-t-2">
                    <button className="w-full text-left flex items-center justify-between">
                      <div className="my-2">
                        <span className="text-lg">Information</span>
                        <p className="truncate text-[.8rem] mt-1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Iusto molestias ea
                        </p>
                      </div>
                      <BsChevronRight className="text-[1.5rem]" />
                    </button>
                  </li>
                </Link>
                <Link
                  to={`${devNavUrl}/tools/list/engagement?toolsId=${toolsId}`}
                >
                  <li className="border-b-2">
                    <button className="w-full text-left flex items-center justify-between">
                      <div className="my-2">
                        <span className="text-lg">Engagement</span>
                        <p className="truncate text-[.8rem] mt-1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Iusto molestias ea
                        </p>
                      </div>
                      <BsChevronRight className="text-[1.5rem]" />
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ToolsInfoList;
