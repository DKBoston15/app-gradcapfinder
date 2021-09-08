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
    <div key={item.item.id} className="flex w-full justify-between pl-10 pr-10">
      <p>{item.item.text}</p>
      <button onClick={() => onDeleteJournal(item.item.id)}>X</button>
    </div>
  );
}
