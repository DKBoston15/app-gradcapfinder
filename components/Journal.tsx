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
    <div key={item.item.id} className="flex">
      <p>{item.item.text}</p>
      <button onClick={() => onDeleteJournal(item.item.id)}>X</button>
    </div>
  );
}
