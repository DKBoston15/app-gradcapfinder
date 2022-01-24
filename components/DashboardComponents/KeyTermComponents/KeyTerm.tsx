import React from "react";

interface IKeyTerm {
  item: {
    id: string;
    key_term: string;
  };
}

export default function KeyTerm({ item, onDeleteKeyTerm }: any) {
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
          onDeleteKeyTerm(item.id);
        }}
      >
        <img src="/close.png" className="w-5" />
      </button>
    </div>
  );
}
