import React from "react";
import { db } from "../firebase";

interface IKeyTerm {
  item: {
    id: string;
    key_term: string;
  };
}

export default function KeyTerm(item: IKeyTerm) {
  const onDeleteKeyTerm = (id: string) => {
    db.collection("key_terms").doc(id).delete();
  };

  return (
    <div key={item.item.id} className="flex w-full justify-between pl-10 pr-10">
      <p>{item.item.key_term}</p>
      <button onClick={() => onDeleteKeyTerm(item.item.id)}>X</button>
    </div>
  );
}
