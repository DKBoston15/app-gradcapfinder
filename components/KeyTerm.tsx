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
    <div
      key={item.item.id}
      className="flex w-full justify-between group hover:bg-hoverGray rounded-lg p-0.5 px-2"
    >
      <p>{item.item.key_term}</p>
      <button
        className="hidden group-hover:block"
        onClick={() => onDeleteKeyTerm(item.item.id)}
      >
        <img src="/close.png" className="w-5" />
      </button>
    </div>
  );
}
