import React from "react";
import { db } from "../firebase";

interface IJournal {
  item: {
    id: string;
    text: string;
    link: string;
  };
}

export default function Journal(item: IJournal) {
  const onDeleteJournal = (id: string) => {
    db.collection("journals").doc(id).delete();
  };

  return (
    <div
      key={item.item.id}
      className="flex w-full justify-between group hover:bg-hoverGray rounded-lg p-0.5 px-2"
    >
      <p>{item.item.text}</p>
      <button
        onClick={() => onDeleteJournal(item.item.id)}
        className="hidden group-hover:block"
      >
        <img src="/close.png" className="w-5" />
      </button>
    </div>
  );
}
