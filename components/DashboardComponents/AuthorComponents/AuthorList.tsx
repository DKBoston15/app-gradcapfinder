import React, { useState, useEffect } from "react";
import Author from "./Author";
import { supabaseClient } from "../../../lib/client";
import { useAuthorStore } from "../../../store/authorStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthorList() {
  // const [journals, setJournals] = useState([]);
  const [author, setAuthor] = useState("");
  const user = supabaseClient.auth.user();

  const authors = useAuthorStore((state: any) => state.authors);
  const subauthors = useAuthorStore((state: any) => state.subauthors);
  const addAuthor = useAuthorStore((state: any) => state.addAuthor);
  const deleteAuthor = useAuthorStore((state: any) => state.deleteAuthor);

  const getAuthors = useAuthorStore((state: any) => state.getAuthors);
  const getSubauthors = useAuthorStore((state: any) => state.getSubauthors);

  const onSubmitAuthor = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const link = "";
    await addAuthor(title, link);
    toast.success("Author Added!", {
      theme: "colored",
    });
    setAuthor("");
  };

  const getSubAuthors = (id: number) => {
    const subAuthors = subauthors.filter(
      (subauthor: any) => subauthor.author_id === id
    );
    return subAuthors;
  };

  useEffect(() => {
    getAuthors();
    getSubauthors();
  }, [authors, subauthors]);

  return (
    <div className="flex flex-col justify-between bg-authorOrange dark:bg-darkSlateGray rounded-xl p-3  w-full h-96 min-h-96 overflow-auto">
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
        <h1 className="text-left text-2xl font-bold">Authors</h1>
        <div className="mt-2 text-lg space-y-1 px-2">
          {authors.map((item: any) => (
            <Author
              //@ts-ignore
              key={item.id}
              item={item}
              // @ts-ignore
              deleteAuthor={deleteAuthor}
              subauthors={getSubAuthors(item.id)}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitAuthor}
          className={`flex justify-between w-full bg-white dark:bg-black p-1 rounded-xl pl-4 ${
            authors.length == 7 ? "bg-snow" : "bg-white"
          }`}
        >
          <input
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter Authors"
            className="w-full mr-2 focus:outline-none focus:none focus:none dark:bg-black"
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
