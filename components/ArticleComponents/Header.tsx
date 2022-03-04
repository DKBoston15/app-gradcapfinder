import React from "react";

export default function Header({
  selectedArticle,
  deleteRow,
  globalFilterValue,
  onGlobalFilterChange,
  setAddArticle,
}: any) {
  return (
    <div className="flex justify-between items-center bg-white h-full">
      <h5 className="m-0 text-3xl font-semibold">Articles</h5>
      <div className="space-x-2">
        <button
          className="font-bold text-black rounded-lg py-2 px-6 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105"
          type="button"
          onClick={() => setAddArticle(true)}
        >
          Add Article
        </button>
        {selectedArticle && (
          <button
            className="font-bold text-black rounded-lg py-2 px-6 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105"
            type="button"
            onClick={() => deleteRow()}
          >
            Delete Selected Article
          </button>
        )}
      </div>
      <span className="p-input-icon-left">
        <i className="pi pi-search pb-2" style={{ fontSize: "1.5rem" }} />
        <div className="ml-12">
          <input
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            className="w-full focus:outline-none focus:none focus:none dark:bg-black bg-dashGray rounded-lg p-4"
          ></input>
        </div>
      </span>
    </div>
  );
}
