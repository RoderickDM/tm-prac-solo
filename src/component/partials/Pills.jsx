import React from "react";

const Pills = ({ label = "Active", tc = "text-green-800" }) => {
  return (
    <span
      className={`${tc} text-[10px]  text-center rounded-full py-1 px-3 font-bold text-sm`}
    >
      {label}
    </span>
  );
};

export default Pills;
