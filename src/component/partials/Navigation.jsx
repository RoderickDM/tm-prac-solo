import React from "react";
import { BsChevronRight } from "react-icons/bs";

const Navigation = () => {
  return (
    <>
      <div className="bg-white text-guray h-full border-r-2">
        <ul className="nav_link custom__scroll pl-4 pr-1 ">
          <li>
            <a href="">
              Introduction
              <BsChevronRight />
            </a>
          </li>
          <li>
            <a href="">
              Installation
              <BsChevronRight />
            </a>
          </li>
          <li>
            <a href="">
              Virtualization
              <BsChevronRight />
            </a>
          </li>
          <li className="active">
            <a href="">
              Configuration
              <BsChevronRight />
            </a>
          </li>
          <li>
            <a href="">
              Cloud
              <BsChevronRight />
            </a>
          </li>
          <li>
            <a href="">
              USB
              <BsChevronRight />
            </a>
          </li>
          <li>
            <a href="">
              Troubleshooting
              <BsChevronRight />
            </a>
          </li>
          <li>
            <a href="">
              Tools
              <BsChevronRight />
            </a>
          </li>
          <li>
            <a href="">
              Mirrors
              <BsChevronRight />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
