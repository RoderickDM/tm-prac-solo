import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import Logo from "../svg/Logo";

const Header = () => {
  return (
    <>
      <div className="flex justify-between p-4 font-bold text-[.9rem] border-b-2">
        <div className="flex gap-6 items-center">
          <div className="lg:hidden md:block sm:block">
            <span className="block w-6 h-1 bg-accent rounded-md"></span>
            <span className="block w-6 h-1 bg-accent rounded-md my-1"></span>
            <span className="block w-6 h-1 bg-accent rounded-md"></span>
          </div>
          <Logo />
          <ul className="lg:flex gap-6 items-center sm:hidden">
            <li className="text-accent">
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
                Download
              </a>
            </li>
          </ul>
        </div>

        <ul className="lg:flex gap-4 items-center sm:hidden ">
          <li>
            <a href="#" className="flex items-center hover:text-accent">
              Gitlab
              <BiLinkExternal />
            </a>
          </li>
          <li className="text-[1.5rem] hover:bg-gray-200 rounded-full p-1">
            <a href="#">
              <BsSun />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
