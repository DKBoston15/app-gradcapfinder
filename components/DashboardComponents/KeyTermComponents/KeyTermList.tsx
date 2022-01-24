import React, { useState, useEffect } from "react";
import KeyTerm from "./KeyTerm";
import { supabaseClient } from "../../../lib/client";

export default function KeyTermList() {
  const [keyTerms, setKeyTerms] = useState([]);
  const [keyTerm, setKeyTerm] = useState("");
  const user = supabaseClient.auth.user();

  useEffect(() => {
    if (user) {
      supabaseClient
        .from("key_terms")
        .select("*")
        .eq("user_id", user?.id)
        .order("title", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            // @ts-ignore
            setKeyTerms(data);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const keyTermsListener = supabaseClient
      .from("key_terms")
      .on("*", (payload) => {
        const newTodo = payload.new;
        const oldTodo = payload.old;
        console.log(payload);
        if (
          Object.keys(newTodo).length === 0 &&
          Object.keys(oldTodo).length === 0
        ) {
          setKeyTerms([]);
        } else if (Object.keys(newTodo).length === 0) {
          return;
        }
        // @ts-ignore
        setKeyTerms((oldKeyTerms) => {
          const newKeyTerms = [...oldKeyTerms, newTodo];
          newKeyTerms.sort((a, b) => b.id - a.id);
          return newKeyTerms;
        });
      })
      .subscribe();

    return () => {
      keyTermsListener.unsubscribe();
    };
  }, []);

  const onSubmitKeyTerm = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const link = "link";
    const { error } = await supabaseClient
      .from("key_terms")
      // @ts-ignore
      .insert([{ title, link, user_id: user.id }]);
    setKeyTerm("");
  };

  const onDeleteKeyTerm = async (id: any) => {
    const { error } = await supabaseClient
      .from("key_terms")
      .delete()
      .eq("id", id);
    if (!error) {
      // @ts-ignore
      setKeyTerms(keyTerms.filter((keyTerm) => keyTerm.id !== id));
    }
  };

  return (
    <div className="flex flex-col justify-between bg-keyTermBlue rounded-xl p-4  w-full h-96  min-h-96">
      <div>
        <h1 className="text-left text-2xl font-bold">Key Terms</h1>
        <div className="mt-4 text-lg space-y-1 px-2">
          {keyTerms.map((item) => (
            <KeyTerm
              //@ts-ignore
              key={item.id}
              item={item}
              onDeleteKeyTerm={onDeleteKeyTerm}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitKeyTerm}
          className={`flex justify-between w-full bg-white p-1 rounded-xl pl-4 ${
            keyTerms.length == 7 ? "bg-snow" : "bg-white"
          }`}
        >
          <input
            required
            value={keyTerm}
            onChange={(e) => setKeyTerm(e.target.value)}
            placeholder="Enter Key Terms"
            className="w-full mr-2 focus:outline-none focus:none focus:none"
            disabled={keyTerms.length == 7 ? true : false}
          ></input>
          <button
            disabled={keyTerms.length == 7 ? true : false}
            className={`font-bold text-white rounded-xl py-2 px-6 my-1 mr-1 text-md cursor-pointer ${
              keyTerms.length == 7 ? "bg-silver" : "bg-primary"
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
