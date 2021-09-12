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
    <div className="flex flex-col justify-between bg-aliceBlue rounded-xl p-3  w-full h-96 min-h-96">
      <div>
        <h1 className="text-left text-2xl font-bold">Journals</h1>
        <div className="mt-4 text-lg space-y-1 px-2">
          {journals.map((item) => (
            //@ts-ignore
            <Journal key={item.id} item={item} />
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
