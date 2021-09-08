import React, { useState, useEffect } from "react";
import Journal from "./Journal";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
import { db } from "../firebase";

export default function JournalsTodo() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [journals, setJournals] = useState([]);
  const [journal, setJournal] = useState("");

  function getJournals() {
    db.collection("journals")
      //@ts-ignore
      .where("user", "==", user.uid)
      .onSnapshot(function (querySnapshot) {
        setJournals(
          //@ts-ignore
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            link: doc.data().link,
            text: doc.data().text,
          }))
        );
      });
  }

  useEffect(() => {
    getJournals();
  }, []);

  const onSubmitJournal = async (e: any) => {
    e.preventDefault();
    if (user) {
      await db.collection("journals").add({
        link: "link",
        text: e.target[0].value,
        user: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setJournal("");
  };
  return (
    <div>
      {journals.map((item) => (
        //@ts-ignore
        <Journal key={item.id} item={item} />
      ))}
      <form onSubmit={onSubmitJournal}>
        <input
          required
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Add Journal"
        />
        {journals.length <= 6 && <button type="submit">Add</button>}
      </form>
    </div>
  );
}
