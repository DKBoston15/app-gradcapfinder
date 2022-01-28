import React, { useState, useEffect } from "react";
import Author from "./Author";
import { supabaseClient } from "../../../lib/client";
export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState("");
  const user = supabaseClient.auth.user();

  useEffect(() => {
    if (user) {
      supabaseClient
        .from("authors")
        .select("*")
        .eq("user_id", user?.id)
        .order("title", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            // @ts-ignore
            setAuthors(data);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const authorListener = supabaseClient
      .from("authors")
      .on("*", (payload) => {
        const newTodo = payload.new;
        const oldTodo = payload.old;
        if (
          Object.keys(newTodo).length === 0 &&
          Object.keys(oldTodo).length === 0
        ) {
          setAuthors([]);
        } else if (Object.keys(newTodo).length === 0) {
          return;
        }
        // @ts-ignore
        setAuthors((oldAuthors) => {
          const newAuthors = [...oldAuthors, newTodo];
          newAuthors.sort((a, b) => b.id - a.id);
          return newAuthors;
        });
      })
      .subscribe();

    return () => {
      authorListener.unsubscribe();
    };
  }, []);

  const onSubmitAuthor = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const link = "link";
    const { error } = await supabaseClient
      .from("authors")
      // @ts-ignore
      .insert([{ title, link, user_id: user.id }]);
    setAuthor("");
  };

  const onDeleteAuthor = async (id: any) => {
    const { error } = await supabaseClient
      .from("authors")
      .delete()
      .eq("id", id);
    if (!error) {
      // @ts-ignore
      setAuthors(authors.filter((author) => author.id !== id));
    }
  };

  return (
    <div className="flex flex-col justify-between bg-authorOrange rounded-xl p-4 w-full h-96  min-h-96">
      <div>
        <h1 className="text-left text-2xl font-bold">Authors</h1>
        <div className="mt-4 text-lg space-y-1 px-2">
          {authors.map((item) => (
            <Author
              //@ts-ignore
              key={item.id}
              item={item}
              // @ts-ignore
              onDeleteAuthor={onDeleteAuthor}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitAuthor}
          className={`flex justify-between w-full bg-white p-1 rounded-xl pl-4 ${
            authors.length == 7 ? "bg-snow" : "bg-white"
          }`}
        >
          <input
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter Authors"
            className="w-full mr-2 focus:outline-none focus:none focus:none"
            disabled={authors.length == 7 ? true : false}
          ></input>
          <button
            disabled={authors.length == 7 ? true : false}
            className={`font-bold text-white rounded-xl py-2 px-6 my-1 mr-1 text-md cursor-pointer ${
              authors.length == 7 ? "bg-silver" : "bg-primary"
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
