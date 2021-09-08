import React from "react";
import { db } from "../firebase";

interface IAuthor {
  item: {
    id: string;
    author: string;
  };
}

export default function Author(item: IAuthor) {
  const onDeleteAuthor = (id: string) => {
    db.collection("authors").doc(id).delete();
  };

  return (
    <div key={item.item.id} className="flex w-full justify-between pl-10 pr-10">
      <p>{item.item.author}</p>
      <button onClick={() => onDeleteAuthor(item.item.id)}>X</button>
    </div>
  );
}
