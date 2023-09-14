import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import Logo from "../svg/Logo";
import { setIsNavigationOpen } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleNav = () => {
    dispatch(setIsNavigationOpen(!store.IsNavigationOpen));
  };

  return (
    <>
      <div className="flex justify-between p-4 font-bold text-[.9rem] border-b-2">
        <div className="flex gap-6 items-center">
          <button
            className="toggle_btn lg:hidden md:block sm:block "
            onClick={handleNav}
          >
            <span className="block w-6 h-1 bg-accent rounded-md"></span>
            <span className="block w-6 h-1 bg-accent rounded-md my-1"></span>
            <span className="block w-6 h-1 bg-accent rounded-md"></span>
          </button>
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
