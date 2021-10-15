import React from "react";
import { db } from "../../../firebase";

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
    <div
      key={item.item.id}
      className="flex w-full justify-between group hover:bg-hoverGray rounded-lg p-0.5 px-2"
    >
      <p>{item.item.author}</p>
      <button
        className="hidden group-hover:block"
        onClick={() => onDeleteAuthor(item.item.id)}
      >
        <img src="/close.png" className="w-5" />
      </button>
    </div>
  );
}
