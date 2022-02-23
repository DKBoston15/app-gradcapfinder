import React, { useState } from "react";
import { RiLinksFill, RiEdit2Fill } from "react-icons/ri";
import SubauthorModal from "./SubauthorModal";
import { useAuthorStore } from "../../../store/authorStore";

const truncateSubauthorName = (name: string) => {
  if (name.length > 34) {
    return name.substring(0, 32) + "...";
  } else {
    return name;
  }
};

export default function Subauthor({ item }: any) {
  const [open, setOpen] = useState(false);

  const editSubAuthor = useAuthorStore((state: any) => state.editSubAuthor);
  const deleteSubauthor = useAuthorStore((state: any) => state.deleteSubauthor);

  return (
    <>
      <SubauthorModal
        open={open}
        setOpen={setOpen}
        editSubAuthor={editSubAuthor}
        id={item.id}
        title={item.title}
        link={item.link}
        cv_link={item.cv_link}
        university={item.university}
        professorial_status={item.professorial_status}
        key_article={item.key_article}
        key_terms={item.key_terms}
        deleteSubauthor={deleteSubauthor}
      />
      <div
        className="flex justify-between items-center whitespace-nowrap pl-8"
        key={item.id}
      >
        <span>{truncateSubauthorName(item.title)}</span>
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
