import React, { useState, useEffect } from "react";
import { supabaseClient } from "../../lib/client";
import Dropdown from "../Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import ArticleSidebar from "../ArticleComponents/ArticleSidebar";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";

import { useArticleStore } from "../../store/articleStore";

import { FilterMatchMode, FilterOperator } from "primereact/api";

import Header from "../ArticleComponents/Header";

export default function Articles({ setCurrentPage }: any) {
  const user = supabaseClient.auth.user();
  const [addArticle, setAddArticle] = useState(false);
  const articles = useArticleStore((state: any) => state.articles);
  const deleteArticle = useArticleStore((state: any) => state.deleteArticle);

  const [expandedRows, setExpandedRows] = useState(null);

  const [selectedArticle, setSelectedArticle] = useState(null);

  const [localArticles, setLocalArticles] = useState(articles);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  const deleteRow = async () => {
    await deleteArticle(selectedArticle.id);
  };

  useEffect(() => {
    const realtimeArticleUpdates = supabaseClient
      .from("articles")
      .on("*", (payload) => {
        console.log(payload);
        const getArticles = useArticleStore.getState().getArticles;
        getArticles();
      })
      .subscribe();
  }, []);

  useEffect(() => {
    setLocalArticles(articles);
  }, [articles]);

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center items-center w-full">
        <a href={rowData.link} target="_blank">
          <button
            className="text-sm whitespace-nowrap font-bold text-black rounded-lg py-2 px-2 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105"
            type="button"
          >
            View Article
          </button>
        </a>
      </div>
    );
  };

  const researchParadigmBodyTemplate = (rowData) => {
    let style = "";
    if (rowData.research_paradigm === "Quantitative") {
      style = "bg-orange-400/50";
    }
    if (rowData.research_paradigm === "Qualitative") {
      style = "bg-purple-400/50";
    }
    if (rowData.research_paradigm === "Mixed Methods") {
      style = "bg-blue-300/50";
    }
    return (
      <span className={`${style} px-2 p-1 rounded-lg`}>
        {rowData.research_paradigm}
      </span>
    );
  };

  const rowExpansionTemplate = (rowData) => {
    return (
      <div className="flex flex-col w-full p-2 pl-12">
        <span>Authors</span>
        <div className="flex pb-8 pt-2 space-x-4 flex-wrap">
          {rowData.authors.map((author: any, index: any) => (
            <span className="border-2 border-dashGray p-2 rounded-lg m-2">
              {author}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <span className="p-float-label">
            <InputText id="journal" disabled value={rowData.journal} />
            <label htmlFor="journal">Journal</label>
          </span>
          <span className="p-float-label">
            <InputText id="year" disabled value={rowData.year} />
            <label htmlFor="year">Year</label>
          </span>

          <span className="p-float-label">
            <InputText id="volume" disabled value={rowData.volume} />
            <label htmlFor="volume">Volume</label>
          </span>
          <span className="p-float-label">
            <InputText id="issue" disabled value={rowData.issue} />
            <label htmlFor="issue">Issue</label>
          </span>
          <span className="p-float-label">
            <InputText id="startPage" disabled value={rowData.start_page} />
            <label htmlFor="startPage">Start Page</label>
          </span>
          <span className="p-float-label">
            <InputText id="endPage" disabled value={rowData.end_page} />
            <label htmlFor="endPage">End Page</label>
          </span>
        </div>

        {/* 


        <div className="flex flex-col space-y-2">
          {rowData.authors.map((author: any, index: any) => (
            <span>{author}</span>
          ))}
        </div>
        <div>{rowData.journal}</div>
        <div>{rowData.volume}</div>
        <div>{rowData.issue}</div>
        <div>
          {rowData.start_page} - {rowData.end_page}
        </div> */}
      </div>
    );
  };

  const onRowSelect = (event) => {
    setAddArticle(false);
  };

  return (
    <>
      <div className="absolute right-4 top-4 z-75">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full flex max-h-screen">
        <div className="flex w-full">
          <div className="h-full w-80/100 min-w-[75%] rounded-lg datatable-doc-demo">
            <DataTable
              onRowSelect={onRowSelect}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              rowExpansionTemplate={rowExpansionTemplate}
              selection={selectedArticle}
              onSelectionChange={(e) => setSelectedArticle(e.value)}
              scrollable
              scrollHeight="flex"
              value={localArticles}
              showGridlines
              header={
                <Header
                  selectedArticle={selectedArticle}
                  deleteRow={deleteRow}
                  setAddArticle={setAddArticle}
                  globalFilterValue={globalFilterValue}
                  onGlobalFilterChange={onGlobalFilterChange}
                />
              }
              filters={filters}
              filterDisplay="menu"
              responsiveLayout="scroll"
              style={{
                maxHeight: "100%",
                backgroundColor: "white",
              }}
            >
              <Column expander style={{ maxWidth: "65px" }} />
              <Column
                selectionMode="single"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: "20px",
                }}
              ></Column>
              <Column
                header="Title"
                sortable
                field="title"
                style={{
                  minWidth: "10rem",
                  padding: "1em",
                }}
              />
              <Column
                header="Research Paradigm"
                style={{
                  minWidth: "12rem",
                  padding: "1em",
                  whiteSpace: "nowrap",
                }}
                sortable
                field="research_paradigm"
                body={researchParadigmBodyTemplate}
              />
              <Column
                header="Research Design"
                style={{
                  minWidth: "11rem",
                  padding: "1em",
                  whiteSpace: "nowrap",
                }}
                sortable
                field="research_design"
              />
              <Column
                header="Sampling Design"
                style={{
                  minWidth: "11rem",
                  padding: "1em",
                  whiteSpace: "nowrap",
                }}
                sortable
                field="sampling_design"
              />
              <Column
                header="Sampling Technique"
                style={{
                  minWidth: "12rem",
                  padding: "1em",
                  whiteSpace: "nowrap",
                }}
                sortable
                field="sampling_technique"
              />
              <Column
                header="Link"
                style={{
                  minWidth: "5rem",
                  padding: "1em",
                }}
                field="link"
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
          <ArticleSidebar
            selectedArticle={selectedArticle}
            setAddArticle={setAddArticle}
            addArticle={addArticle}
          />
        </div>
      </div>
    </>
  );
}
