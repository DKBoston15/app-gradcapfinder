import React from "react";

interface IJournal {
  item: {
    id: string;
    insertedat: string;
    link: string;
    title: string;
    user_id: string;
  };
}

export default function Journal({ item, onDeleteJournal }: any) {
  return (
    <div
      key={item.id}
      className="flex w-full justify-between group hover:bg-hoverGray rounded-lg p-0.5 px-2"
    >
      <p>{item.title}</p>
      <button
        onClick={(event) => {
          event.stopPropagation();
          onDeleteJournal(item.id);
        }}
        className="hidden group-hover:block"
      >
        <img src="/close.png" className="w-5" />
      </button>
    </div>
  );
}
