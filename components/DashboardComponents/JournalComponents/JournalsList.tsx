import React, { useState, useEffect } from "react";
import Journal from "./Journal";
import { supabaseClient } from "../../../lib/client";
import { useJournalStore } from "../../../store/journalStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JournalsList() {
  // const [journals, setJournals] = useState([]);
  const [journal, setJournal] = useState("");
  const user = supabaseClient.auth.user();

  const journals = useJournalStore((state: any) => state.journals);
  const subjournals = useJournalStore((state: any) => state.subjournals);
  const addJournal = useJournalStore((state: any) => state.addJournal);
  const deleteJournal = useJournalStore((state: any) => state.deleteJournal);

  const onSubmitJournal = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const link = "";
    await addJournal(title, link);
    toast.success("Journal Added!", {
      theme: "colored",
    });
    setJournal("");
  };

  const getSubJournals = (id: number) => {
    const subJournals = subjournals.filter(
      (subjournal: any) => subjournal.journal_id === id
    );
    return subJournals;
  };

  return (
    <div className="flex flex-col justify-between bg-aliceBlue dark:bg-darkSlateGray rounded-xl p-3  w-full h-96 min-h-96 overflow-auto">
      <div>
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
        <h1 className="text-left text-2xl font-bold">Journals</h1>
        <div className="mt-2 text-lg space-y-1 px-2">
          {journals.map((item: any) => (
            <Journal
              //@ts-ignore
              key={item.id}
              item={item}
              // @ts-ignore
              deleteJournal={deleteJournal}
              subjournals={getSubJournals(item.id)}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitJournal}
          className={`flex justify-between w-full bg-white dark:bg-black p-1 rounded-xl pl-4 ${
            journals.length == 7 ? "bg-snow" : "bg-white"
          }`}
        >
          <input
            required
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Enter Journals"
            className="w-full mr-2 focus:outline-none focus:none focus:none dark:bg-black"
            disabled={journals.length == 7 ? true : false}
          ></input>
          <button
            disabled={journals.length == 7 ? true : false}
            className={`font-bold text-white rounded-xl py-2 px-6 my-1 mr-1 text-md cursor-pointer ${
              journals.length == 7 ? "bg-silver" : "bg-primary"
            }`}
            type="submit"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
