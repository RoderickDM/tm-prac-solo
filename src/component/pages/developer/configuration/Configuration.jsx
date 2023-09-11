import React from "react";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import ConfigurationTable from "./ConfigurationTable";
import BreadCrumbs from "../../../partials/BreadCrumbs";

const Configuration = () => {
  return (
    <>
      <Header />
      <section className="main__grid">
        <aside>
          <Navigation />
        </aside>
        <main className="py-4">
          <BreadCrumbs />
          <div className="py-6">
            <h1 className="text-[3rem] py-2">Configuration</h1>
            <p>Some basics for managing your OS</p>
          </div>
          <ConfigurationTable />
        </main>
      </section>
    </>
  );
};

export default Configuration;
