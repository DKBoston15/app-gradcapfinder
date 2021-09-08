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
    <div className="flex flex-col justify-between border-8 border-black rounded p-5 border-opacity-50 border-blue-600 w-full min-h-full">
      <h1 className="text-center text-3xl mb-7">Authors</h1>
      <div>
        {authors.map((item) => (
          //@ts-ignore
          <Author key={item.id} item={item} />
        ))}
      </div>
      <div>
        {authors.length <= 6 && (
          <form onSubmit={onSubmitKeyTerm} className="flex justify-between">
            <input
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Add Author"
            />

            <button
              className="ml-10 border-blue-600 border-opacity-50 p-3 pr-8 pl-8 text-xl border-2 hover:bg-blue-600 hover:bg-opacity-50"
              type="submit"
            >
              Add
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
