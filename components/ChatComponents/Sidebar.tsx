import React, { useState, useEffect } from "react";
import SidebarDiscussion from "./SidebarDiscussion";
import Fuse from "fuse.js";

export default function Sidebar({
  setSelectedDiscussion,
  selectedDiscussion,
  daneDiscussionId,
  dakotaDiscussionId,
}: any) {
  const discussionArr = ["Dr. Bozeman", "Tech Support"];
  const [filteredSearch, setFilteredSearch] = useState(discussionArr);
  const fuse = new Fuse(discussionArr);

  const onChange = (e: any) => {
    if (e === "") {
      setFilteredSearch(discussionArr);
    } else {
      // @ts-ignore
      let arr = [];
      const result = fuse.search(e);
      result.forEach((res) => {
        arr.push(res.item);
      });
      // @ts-ignore
      setFilteredSearch(arr);
    }
  };

  return (
    <div className="bg-white dark:bg-black h-full min-w-72 w-72 text-left flex flex-col justify-start py-8 px-4">
      <h1 className="text-4xl font-semibold">Chats</h1>
      <div>
        <input
          placeholder="Search"
          onChange={(e) => onChange(e.target.value)}
          className="w-full mr-2 focus:outline-none focus:none focus:none bg-dashGray dark:bg-completeBlack rounded-lg px-4 py-3 mt-8"
        ></input>
      </div>
      <ul className="mt-8 space-y-4">
        {filteredSearch.map((discussion) => (
          <SidebarDiscussion
            key={discussion}
            admin={discussion}
            setSelectedDiscussion={setSelectedDiscussion}
            selectedDiscussion={selectedDiscussion}
            daneDiscussionId={daneDiscussionId}
            dakotaDiscussionId={dakotaDiscussionId}
          />
        ))}
      </ul>
    </div>
  );
}
