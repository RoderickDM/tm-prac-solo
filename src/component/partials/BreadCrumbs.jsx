import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";

const BreadCrumbs = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <AiFillHome />
        <BsChevronRight />
        <span className="text-[.8rem] bg-gray-100 rounded-full p-2 text-accent">
          Configuration
        </span>
      </div>
    </>
  );
};

export default BreadCrumbs;
