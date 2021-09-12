import React from "react";

export default function TasksDue() {
  return (
    <div className="bg-dashGray w-1/2 rounded-xl p-5">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-2xl">Tasks due soon</span>{" "}
        <button
          className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 text-md cursor-pointer bg-white`}
        >
          View All
        </button>
      </div>
      <div></div>
    </div>
  );
}
