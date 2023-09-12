import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";

const BreadCrumbs = () => {
  return (
    <>
      <div className="flex items-center gap-4 pl-4">
        <AiFillHome />
        <BsChevronRight className="text-[10px]" />
        <span className="text-[.7rem] bg-gray-100 rounded-full px-3 py-2 text-accent">
          Configuration
        </span>
      </div>
    </>
  );
};

export default BreadCrumbs;
