import React, { useState } from "react";
import { RiLinksFill, RiEdit2Fill } from "react-icons/ri";
import SubKeytermModal from "./SubKeytermModal";
import { useKeytermStore } from "../../../store/keytermStore";

const truncateSubkeytermlName = (name: string) => {
  if (name.length > 34) {
    return name.substring(0, 32) + "...";
  } else {
    return name;
  }
};

export default function SubKeyterm({ item }: any) {
  const [open, setOpen] = useState(false);

  const editSubKeyterm = useKeytermStore((state: any) => state.editSubKeyterm);
  const deleteSubKeyterm = useKeytermStore(
    (state: any) => state.deleteSubKeyterm
  );

  return (
    <>
      <SubKeytermModal
        open={open}
        setOpen={setOpen}
        editSubKeyterm={editSubKeyterm}
        id={item.id}
        title={item.title}
        link={item.link}
        citations={item.citations}
        key_article={item.key_article}
        authors={item.authors}
        deleteSubKeyterm={deleteSubKeyterm}
      />
      <div
        className="flex justify-between items-center whitespace-nowrap pl-8"
        key={item.id}
      >
        <span>{truncateSubkeytermlName(item.title)}</span>
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
