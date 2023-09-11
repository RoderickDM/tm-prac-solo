import React from "react";
import { BsChevronRight } from "react-icons/bs";
import {
  setIsSearch,
  setIsConfigurationOpen,
  setIsShow,
  setIsToolsOpen,
} from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";
import { Link } from "react-router-dom";

const Navigation = ({
  menu,
  submenu = null,
  // setIsSettingOpen,
  val,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlRolePath = `${devNavUrl}`;
  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
    dispatch(setIsSearch(false));
  };

  const handleDropDownTool = (e) => {
    dispatch(setIsToolsOpen(!store.isToolsOpen));
  };

  const handleDropDownConfiguration = (e) => {
    dispatch(setIsConfigurationOpen(!store.isConfigurationOpen));
  };

  return (
    <>
      <div className="bg-white text-guray h-full p-1 border-r-2 font-bold">
        <ul className="custom__scroll">
         <li className={`nav__link ${store.isConfigurationOpen && "active"}`}>
          <button  className={`${menu === "configuration" ? "bg-gray-100" : ""} w-full p-2`}
            onClick={() => handleDropDownConfiguration()}>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <span className="text-lg">Configuration</span>
              </div>
              <BsChevronRight
                className={!store.isConfigurationOpen ? "rotate-0" : "rotate-90"}
              />
            </div>
          </button>
          <ul className="ml-6 submenu__link">
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                Parrot Software Management
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                Install Nvidia GPU driver
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                File and Directory Permissions
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                AppArmor
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                Hash and key verification
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                Assistive Technologies
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                Desktop Environments
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                TRIM on SSD
              </Link>
            </li>
            <li
              className={` ${
                submenu === "configurationSampleOtp"
                  ? "bg-[light_gray]/80 rounded-md"
                  : ""
              }`}
            >
              <Link
                to={`${urlRolePath}/configuration/sampleOtp`}
                className={`text-guray hover:!border-accent duration-150 pl-2 w-fit inline-block py-1 ${
                  submenu === "configurationSampleOtp" ? "active__submenu" : ""
                }`}
              >
                File and Directory Permissions
              </Link>
            </li>
          </ul>
         </li>          
        </ul>
      </div>
    </>
  );
};

export default Navigation;
