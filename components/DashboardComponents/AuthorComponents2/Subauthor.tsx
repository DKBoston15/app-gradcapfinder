import React, { useState } from "react";
import { RiLinksFill, RiEdit2Fill } from "react-icons/ri";
import SubjournalModal from "./SubauthorModal";
import { useJournalStore } from "../../../store/journalStore";

const truncateSubjournalName = (name: string) => {
  if (name.length > 34) {
    return name.substring(0, 32) + "...";
  } else {
    return name;
  }
};

export default function Journal({ item }: any) {
  const [open, setOpen] = useState(false);

  const editSubJournal = useJournalStore((state: any) => state.editSubJournal);
  const deleteSubjournal = useJournalStore(
    (state: any) => state.deleteSubjournal
  );

  return (
    <>
      <SubjournalModal
        open={open}
        setOpen={setOpen}
        editSubJournal={editSubJournal}
        id={item.id}
        title={item.title}
        link={item.link}
        deleteSubjournal={deleteSubjournal}
      />
      <div
        className="flex justify-between items-center whitespace-nowrap pl-8"
        key={item.id}
      >
        <span>{truncateSubjournalName(item.title)}</span>
        <div className="flex space-x-4 mr-8">
          <span
            className="cursor-pointer hover:transform hover:scale-105"
            onClick={() => {
              setOpen(true);
            }}
          >
            <RiEdit2Fill />
          </span>
          {item.link && (
            <>
              {item.link.length > 0 && (
                <span
                  className="ml-8 cursor-pointer hover:transform hover:scale-105"
                  onClick={() => {
                    let url = item.link;
                    if (!url.match(/^https?:\/\//i)) {
                      url = "http://" + url;
                    }
                    window.open(url, "_blank");
                  }}
                >
                  <RiLinksFill />
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
