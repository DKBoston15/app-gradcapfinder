import React from "react";
interface IAuthor {
  item: {
    id: string;
    author: string;
  };
}

export default function Author({ item, onDeleteAuthor }: any) {
  return (
    <div
      key={item.id}
      className="flex w-full justify-between group hover:bg-hoverGray rounded-lg p-0.5 px-2"
    >
      <p>{item.title}</p>
      <button
        className="hidden group-hover:block"
        onClick={(event) => {
          event.stopPropagation();
          onDeleteAuthor(item.id);
        }}
      >
        <img src="/close.png" className="w-5" />
      </button>
    </div>
  );
}
