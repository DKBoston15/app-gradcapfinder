import React, { useState, useEffect } from "react";
import { supabaseClient } from "../../../lib/client";
import { useKeytermStore } from "../../../store/keytermStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import KeyTerm from "./KeyTerm";

export default function KeytermsList() {
  const [keyterm, setKeyterm] = useState("");
  const user = supabaseClient.auth.user();

  const keyterms = useKeytermStore((state: any) => state.keyterms);
  const subKeyterms = useKeytermStore((state: any) => state.subKeyterms);
  const addKeyterm = useKeytermStore((state: any) => state.addKeyterm);
  const deleteKeyterm = useKeytermStore((state: any) => state.deleteKeyterm);

  const getKeyterms = useKeytermStore((state: any) => state.getKeyterms);
  const getSubKeytermsStore = useKeytermStore(
    (state: any) => state.getSubKeyterms
  );

  const onSubmitKeyterm = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const link = "";
    await addKeyterm(title, link);
    toast.success("Keyterm Added!", {
      theme: "colored",
    });
    setKeyterm("");
  };

  const getSubKeyterms = (id: number) => {
    const subkeyterms = subKeyterms.filter(
      (subKeyterm: any) => subKeyterm.keyterm_id === id
    );
    return subkeyterms;
  };

  return (
    <div className="flex flex-col justify-between bg-keyTermBlue dark:bg-darkSlateGray rounded-xl p-3  w-full h-96 min-h-96 overflow-auto">
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
        <h1 className="text-left text-2xl font-bold">Key Terms</h1>
        <div className="mt-2 text-lg space-y-1 px-2">
          {keyterms.map((item: any) => (
            <KeyTerm
              //@ts-ignore
              key={item.id}
              item={item}
              // @ts-ignore
              deleteKeyterm={deleteKeyterm}
              subKeyterms={getSubKeyterms(item.id)}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitKeyterm}
          className={`flex justify-between w-full bg-white dark:bg-black p-1 rounded-xl pl-4 ${
            keyterms.length == 7 ? "bg-snow" : "bg-white"
          }`}
        >
          <input
            required
            value={keyterm}
            onChange={(e) => setKeyterm(e.target.value)}
            placeholder="Enter Keyterms"
            className="w-full mr-2 focus:outline-none focus:none focus:none dark:bg-black"
            disabled={keyterms.length == 7 ? true : false}
          ></input>
          <button
            disabled={keyterms.length == 7 ? true : false}
            className={`font-bold text-white rounded-xl py-2 px-6 my-1 mr-1 text-md cursor-pointer ${
              keyterms.length == 7 ? "bg-silver" : "bg-primary"
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
