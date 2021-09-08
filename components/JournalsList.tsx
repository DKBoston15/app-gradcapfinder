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
    <div className="flex flex-col justify-between border-8 border-black rounded p-5 border-opacity-50 border-green-600 w-full min-h-full">
      <h1 className="text-center text-3xl mb-7">Journals</h1>
      <div>
        {journals.map((item) => (
          //@ts-ignore
          <Journal key={item.id} item={item} />
        ))}
      </div>
      <div>
        {journals.length <= 6 && (
          <form onSubmit={onSubmitJournal} className="flex justify-between">
            <input
              required
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="Add Journal"
            />

            <button
              className="ml-10 border-green-600 border-opacity-50 p-3 pr-8 pl-8 text-xl border-2 hover:bg-green-600 hover:bg-opacity-50"
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
