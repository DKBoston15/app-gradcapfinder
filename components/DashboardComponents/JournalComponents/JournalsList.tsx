import React, { useState, useEffect } from "react";
import Journal from "./Journal";
import { supabaseClient } from "../../../lib/client";

export default function JournalsList() {
  const [journals, setJournals] = useState([]);
  const [journal, setJournal] = useState("");
  const user = supabaseClient.auth.user();

  useEffect(() => {
    if (user) {
      supabaseClient
        .from("journals")
        .select("*")
        .eq("user_id", user?.id)
        .order("title", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            // @ts-ignore
            setJournals(data);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const journalListener = supabaseClient
      .from("journals")
      .on("*", (payload) => {
        const newTodo = payload.new;
        const oldTodo = payload.old;
        if (
          Object.keys(newTodo).length === 0 &&
          Object.keys(oldTodo).length === 0
        ) {
          setJournals([]);
        } else if (Object.keys(newTodo).length === 0) {
          return;
        }
        // @ts-ignore
        setJournals((oldJournals) => {
          const newJournals = [...oldJournals, newTodo];
          newJournals.sort((a, b) => b.id - a.id);
          return newJournals;
        });
      })
      .subscribe();

    return () => {
      journalListener.unsubscribe();
    };
  }, []);

  const onSubmitJournal = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const link = "link";
    const { error } = await supabaseClient
      .from("journals")
      .insert([{ title, link, user_id: user?.id }]);
    setJournal("");
  };

  const onDeleteJournal = async (id: any) => {
    const { error } = await supabaseClient
      .from("journals")
      .delete()
      .eq("id", id);
    if (!error) {
      // @ts-ignore
      setJournals(journals.filter((journal) => journal.id !== id));
    }
  };

  return (
    <div className="flex flex-col justify-between bg-aliceBlue rounded-xl p-3  w-full h-96 min-h-96">
      <div>
        <h1 className="text-left text-2xl font-bold">Journals</h1>
        <div className="mt-4 text-lg space-y-1 px-2">
          {journals.map((item) => (
            <Journal
              //@ts-ignore
              key={item.id}
              item={item}
              // @ts-ignore
              onDeleteJournal={onDeleteJournal}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitJournal}
          className={`flex justify-between w-full bg-white p-1 rounded-xl pl-4 ${
            journals.length == 7 ? "bg-snow" : "bg-white"
          }`}
        >
          <input
            required
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Enter Journals"
            className="w-full mr-2 focus:outline-none focus:none focus:none"
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
