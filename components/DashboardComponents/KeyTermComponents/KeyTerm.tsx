import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { RiArrowDownSLine, RiLinksFill, RiEdit2Fill } from "react-icons/ri";
import SubKeyterm from "./SubKeyterm";
import KeytermModal from "./KeytermModal";
import AddSubKeytermModal from "./AddSubKeytermModal";
import { useKeytermStore } from "../../../store/keytermStore";

const truncateKeytermName = (name: string) => {
  if (name.length > 34) {
    return name.substring(0, 34) + "...";
  } else {
    return name;
  }
};

export default function Keyterm({ item, deleteKeyterm, subKeyterms }: any) {
  const [open, setOpen] = useState(false);
  const [openAddKeyterm, setOpenAddKeyterm] = useState(false);
  const editKeyterm = useKeytermStore((state: any) => state.editKeyterm);
  const addSubKeyterm = useKeytermStore((state: any) => state.addSubKeyterm);

  return (
    <>
      <AddSubKeytermModal
        open={openAddKeyterm}
        setOpen={setOpenAddKeyterm}
        addSubKeyterm={addSubKeyterm}
        keytermId={item.id}
      />
      <KeytermModal
        open={open}
        setOpen={setOpen}
        editKeyterm={editKeyterm}
        id={item.id}
        title={item.title}
        link={item.link}
        deleteKeyterm={deleteKeyterm}
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
              <span>{truncateKeytermName(item.title)}</span>
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
          {subKeyterms.map((item: any) => (
            <SubKeyterm
              //@ts-ignore
              key={item.id}
              item={item}
            />
          ))}
          {subKeyterms.length < 7 && (
            <div
              onClick={() => {
                setOpenAddKeyterm(true);
              }}
              className="mt-2 cursor-pointer hover:transform hover:scale-105"
            >
              <span className="text-primary ml-8">+</span>
              <span className="ml-2 text-gray">Add SubKeyterm</span>
            </div>
          )}
        </Collapsible>
      </div>
    </>
  );
}
