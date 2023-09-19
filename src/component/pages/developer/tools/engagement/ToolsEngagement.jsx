import React from "react";
import {
  setIsAdd,
  setIsConfigurationOpen,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import Toast from "../../../../partials/Toast";
import ModalValidate from "../../../../partials/modals/ModalValidate";
import ModalAddTools from "../ModalAddTools";
import ToolsEngagementTable from "./ToolsEngagementTable";
// import {
//   setIsAdd,
//   setIsConfigurationOpen,
// } from "../../../../store/StoreAction";
// import { StoreContext } from "../../../../store/StoreContext";
// import Header from "../../../partials/Header";
// import Navigation from "../../../partials/Navigation";
// import Toast from "../../../partials/Toast";
// import ModalValidate from "../../../partials/modals/ModalValidate";
// import ModalAddTools from "./ModalAddTools";
// import ToolsList from "./ToolsList";
// import BreadCrumbs from "../../../partials/BreadCrumbs";

const ToolsEngagement = () => {
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
        <aside className={store.isNavigationOpen ? "active" : ""}>
          <Navigation menu="tools" />
        </aside>
        <main className="py-3">
          <div className="container">
            <div className="lg:max-w-[75%]">
              <BreadCrumbs param={location.search} />
              <div className="py-6">
                <div>
                  <h1 className="text-[3rem]">Engagement</h1>
                  <div className="flex justify-between items-center">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, velit.
                    </p>
                    <button
                      className="btn btn--accent btn--sm"
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <ToolsEngagementTable setItemEdit={setItemEdit} />
            </div>
          </div>
        </main>
      </section>

      {store.isAdd && <ModalAddTools itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}

      {store.success && <Toast />}
    </>
  );
};

export default ToolsEngagement;
