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

  const onSubmitJournal = async (e: any) => {
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
    <div>
      {authors.map((item) => (
        //@ts-ignore
        <Author key={item.id} item={item} />
      ))}
      <form onSubmit={onSubmitJournal}>
        <input
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Add Author"
        />
        {authors.length <= 6 && <button type="submit">Add</button>}
      </form>
    </div>
  );
}
