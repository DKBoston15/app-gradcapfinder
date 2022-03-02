import React, { useState, useEffect } from "react";
import Conference from "./Conference";
import { supabaseClient } from "../../lib/client";
import { useConferenceStore } from "../../store/conferenceStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";

export default function ConferencesList() {
  const [conference, setConference] = useState("");
  const user = supabaseClient.auth.user();

  const conferences = useConferenceStore((state: any) => state.conferences);
  const addConference = useConferenceStore((state: any) => state.addConference);
  const deleteConference = useConferenceStore(
    (state: any) => state.deleteConference
  );

  const onSubmitConference = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    await addConference(title);
    toast.success("Conference Added!", {
      theme: "colored",
    });
    setConference("");
  };

  return (
    <div className="flex flex-col justify-between bg-aliceBlue dark:bg-darkSlateGray rounded-xl p-3 w-full h-96 min-h-96 overflow-auto">
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
        <h1 className="text-left text-2xl font-bold">Conferences</h1>
        <div className="mt-2 text-lg space-y-1 px-2">
          {conferences.map((item: any) => (
            <Conference
              //@ts-ignore
              key={item.id}
              item={item}
              // @ts-ignore
              deleteConference={deleteConference}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitConference}
          data-tip
          data-for="disabledInputConferences"
          className={`flex justify-between w-full bg-white dark:bg-black p-1 rounded-xl pl-4 ${
            conferences.length == 7 ? "bg-snow" : "bg-white"
          }`}
        >
          {conferences.length == 7 && (
            <ReactTooltip
              id="disabledInputConferences"
              type="dark"
              effect="solid"
            >
              <span>No more than 3 to 7 conferences</span>
            </ReactTooltip>
          )}
          <input
            required
            value={conference}
            onChange={(e) => setConference(e.target.value)}
            placeholder="Enter Conference"
            className="w-full mr-2 focus:outline-none focus:none focus:none dark:bg-black"
            disabled={conferences.length == 7 ? true : false}
          ></input>
          <button
            disabled={conferences.length == 7 ? true : false}
            className={`font-bold text-white rounded-xl py-2 px-6 my-1 mr-1 text-md cursor-pointer ${
              conferences.length == 7 ? "bg-silver" : "bg-primary"
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
