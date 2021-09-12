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
    <div className="flex flex-col justify-between bg-keyTermBlue rounded-xl p-4  w-full h-96  min-h-96">
      <div>
        <h1 className="text-left text-2xl font-bold">Key Terms</h1>
        <div className="mt-4 text-lg space-y-1 px-2">
          {keyTerms.map((item) => (
            //@ts-ignore
            <KeyTerm key={item.id} item={item} />
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
