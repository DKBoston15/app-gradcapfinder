import React, { useState, useEffect } from "react";
import Author from "./Author";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
import { db } from "../firebase";

export default function JournalsTodo() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState("");

  function getAuthors() {
    db.collection("authors")
      //@ts-ignore
      .where("user", "==", user.uid)
      .onSnapshot(function (querySnapshot) {
        setAuthors(
          //@ts-ignore
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            author: doc.data().author,
          }))
        );
      });
  }

  useEffect(() => {
    getAuthors();
  }, []);

  const onSubmitKeyTerm = async (e: any) => {
    e.preventDefault();
    if (user) {
      await db.collection("authors").add({
        author: e.target[0].value,
        user: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setAuthor("");
  };
  return (
    <div className="flex flex-col justify-between bg-authorOrange rounded-xl p-4 w-full h-96  min-h-96">
      <div>
        <h1 className="text-left text-2xl font-bold">Authors</h1>
        <div className="mt-4 text-lg space-y-1 px-2">
          {authors.map((item) => (
            //@ts-ignore
            <Author key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div>
        <form
          onSubmit={onSubmitKeyTerm}
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
