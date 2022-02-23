import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { RiArrowDownSLine, RiLinksFill, RiEdit2Fill } from "react-icons/ri";
import Subauthor from "./Subauthor";
import AuthorModal from "./AuthorModal";
import AddSubauthorModal from "./AddSubauthorModal";
import { useAuthorStore } from "../../../store/authorStore";

const truncateJournalName = (name: string) => {
  if (name.length > 34) {
    return name.substring(0, 34) + "...";
  } else {
    return name;
  }
};

export default function Author({ item, deleteAuthor, subauthors }: any) {
  const [open, setOpen] = useState(false);
  const [openAddAuthor, setOpenAddAuthor] = useState(false);
  const editAuthor = useAuthorStore((state: any) => state.editAuthor);
  const addSubauthor = useAuthorStore((state: any) => state.addSubauthor);

  return (
    <>
      <AddSubauthorModal
        open={openAddAuthor}
        setOpen={setOpenAddAuthor}
        addSubauthor={addSubauthor}
        authorId={item.id}
      />
      <AuthorModal
        open={open}
        setOpen={setOpen}
        editAuthor={editAuthor}
        id={item.id}
        title={item.title}
        link={item.link}
        cv_link={item.cv_link}
        university={item.university}
        professorial_status={item.professorial_status}
        key_article={item.key_article}
        key_terms={item.key_terms}
        deleteAuthor={deleteAuthor}
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
          {subauthors.map((item: any) => (
            <Subauthor
              //@ts-ignore
              key={item.id}
              item={item}
            />
          ))}
          {subauthors.length < 7 && (
            <div
              onClick={() => {
                setOpenAddAuthor(true);
              }}
              className="mt-2 cursor-pointer hover:transform hover:scale-105"
            >
              <span className="text-primary ml-8">+</span>
              <span className="ml-2 text-gray">Add Subauthor</span>
            </div>
          )}
        </Collapsible>
        <span className="ml-2 text-gray">{subauthors.length}</span>
      </div>
    </>
  );
}
