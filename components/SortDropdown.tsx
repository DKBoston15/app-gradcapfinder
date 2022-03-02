import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import {
  FaFilter,
  FaSortAlphaDownAlt,
  FaSortAlphaDown,
  FaSort,
  FaRegCalendarAlt,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const SortDropdownRender = ({ setSortType, setFilterType }: any) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        dropdownPopoverShow &&
        btnDropdownRef.current &&
        //@ts-ignore
        !btnDropdownRef.current.contains(e.target)
      ) {
        setDropdownPopoverShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownPopoverShow]);

  const openDropdownPopover = () => {
    //@ts-ignore
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div>
          <div
            //@ts-ignore
            ref={btnDropdownRef}
            onClick={() => {
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover();
            }}
          >
            <div className="flex items-center space-x-2 font-bold text-white rounded-xl py-2 px-6 text-md cursor-pointer bg-primary">
              <FaSort />
              <div>Sort</div>
            </div>
            <div
              //@ts-ignore
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "text-base z-50 py-2 list-none text-left rounded shadow-lg mt-1 bg-white dark:bg-darkSlateGray"
              }
              style={{ minWidth: "6rem" }}
            >
              <div className="flex flex-col space-y-4 items-center text-xl p-4">
                <button onClick={() => setSortType("dateAsc")} className="flex">
                  <FaRegCalendarAlt />
                  <FaArrowUp />
                </button>
                <button onClick={() => setSortType("dateDsc")} className="flex">
                  <FaRegCalendarAlt />
                  <FaArrowDown />
                </button>
                <button onClick={() => setSortType("aZ")}>
                  <FaSortAlphaDown />
                </button>
                <button onClick={() => setSortType("zA")}>
                  <FaSortAlphaDownAlt />
                </button>
                <button onClick={() => setSortType("completed")}>
                  Completed
                </button>
                <button onClick={() => setSortType("archived")}>
                  Archived
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function SortDropdown({ setSortType, setFilterType }: any) {
  return (
    <>
      <SortDropdownRender
        setSortType={setSortType}
        setFilterType={setFilterType}
      />
    </>
  );
}
