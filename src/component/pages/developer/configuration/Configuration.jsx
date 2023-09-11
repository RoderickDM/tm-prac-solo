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
          <Navigation menu="configuration" submenu="configurationSampleOtp" />
        </aside>
        <main className="py-4 !max-w-[75%]">
          <BreadCrumbs />                
          <div className="py-6 flex items-center justify-between">                
            <div>
            <h1 className="text-[3rem] py-2">Configuration</h1>
            <p>Some basics for managing your OS</p> 
            </div>
            <button className="btn btn--accent btn--sm">
              Add
            </button>
          </div>
          <ConfigurationTable />
        </main>
      </section>
    </>
  );
};

export default Configuration;
