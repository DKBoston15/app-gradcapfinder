import React, { useState, useEffect } from "react";
import KeyTerm from "./KeyTerm";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
import { db } from "../firebase";

export default function JournalsTodo() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [keyTerms, setKeyTerms] = useState([]);
  const [keyTerm, setKeyTerm] = useState("");

  function getKeyTerms() {
    db.collection("key_terms")
      //@ts-ignore
      .where("user", "==", user.uid)
      .onSnapshot(function (querySnapshot) {
        setKeyTerms(
          //@ts-ignore
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            key_term: doc.data().key_term,
          }))
        );
      });
  }

  useEffect(() => {
    getKeyTerms();
  }, []);

  const onSubmitKeyTerm = async (e: any) => {
    e.preventDefault();
    if (user) {
      await db.collection("key_terms").add({
        key_term: e.target[0].value,
        user: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setKeyTerm("");
  };
  return (
    <div className="flex flex-col justify-between border-8 border-black rounded p-5 border-opacity-50 border-yellow-600 w-full min-h-full">
      <h1 className="text-center text-3xl mb-7">Key Terms</h1>
      <div>
        {keyTerms.map((item) => (
          //@ts-ignore
          <KeyTerm key={item.id} item={item} />
        ))}
      </div>
      <div>
        {keyTerms.length <= 6 && (
          <form onSubmit={onSubmitKeyTerm} className="flex justify-between">
            <input
              required
              value={keyTerm}
              onChange={(e) => setKeyTerm(e.target.value)}
              placeholder="Add Key Term"
              className="w-full border-yellow-600 border-opacity-50 border-2 pl-5 focus:border-opacity-10"
            />

            <button
              className="ml-10 border-yellow-600 border-opacity-50 p-3 pr-8 pl-8 text-xl border-2 hover:bg-yellow-600 hover:bg-opacity-50"
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
