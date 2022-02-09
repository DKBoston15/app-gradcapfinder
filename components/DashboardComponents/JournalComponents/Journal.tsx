import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { RiArrowDownSLine, RiLinksFill, RiEdit2Fill } from "react-icons/ri";
import Subjournal from "./Subjournal";
import JournalModal from "./JournalModal";
import AddSubjournalModal from "./AddSubjournalModal";
import { useJournalStore } from "../../../store/journalStore";
interface IJournal {
  item: {
    id: string;
    insertedat: string;
    link: string;
    title: string;
    user_id: string;
  };
}

const truncateJournalName = (name: string) => {
  if (name.length > 34) {
    return name.substring(0, 34) + "...";
  } else {
    return name;
  }
};

export default function Journal({ item, deleteJournal, subjournals }: any) {
  const [open, setOpen] = useState(false);
  const [openAddJournal, setOpenAddJournal] = useState(false);
  const editJournal = useJournalStore((state: any) => state.editJournal);
  const addSubjournal = useJournalStore((state: any) => state.addSubjournal);

  return (
    <>
      <AddSubjournalModal
        open={openAddJournal}
        setOpen={setOpenAddJournal}
        addSubjournal={addSubjournal}
        journalId={item.id}
      />
      <JournalModal
        open={open}
        setOpen={setOpen}
        editJournal={editJournal}
        id={item.id}
        title={item.title}
        link={item.link}
        deleteJournal={deleteJournal}
      />
      <div
        key={item.id}
        className="flex w-full justify-between rounded-lg p-0.5 px-2"
      >
        <Collapsible
          className="w-full"
          openedClassName="w-full"
          trigger={
            <div className="flex justify-between items-center whitespace-nowrap">
              <span>{truncateJournalName(item.title)}</span>
              <div className="flex space-x-4">
                <span
                  className="cursor-pointer hover:transform hover:scale-125"
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
                        className="cursor-pointer hover:transform hover:scale-125"
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
                <span className="cursor-pointer hover:transform hover:scale-125">
                  <RiArrowDownSLine />
                </span>
              </div>
            </div>
          }
          key={item.id}
        >
          {subjournals.map((item: any) => (
            <Subjournal
              //@ts-ignore
              key={item.id}
              item={item}
            />
          ))}
          {subjournals.length < 7 && (
            <div
              onClick={() => {
                setOpenAddJournal(true);
              }}
              className="mt-2 cursor-pointer hover:transform hover:scale-105"
            >
              <span className="text-primary ml-8">+</span>
              <span className="ml-2 text-gray">Add Subjournal</span>
            </div>
          )}
        </Collapsible>
      </div>
    </>
  );
}
