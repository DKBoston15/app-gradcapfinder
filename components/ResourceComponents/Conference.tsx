import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { RiArrowDownSLine, RiLinksFill, RiEdit2Fill } from "react-icons/ri";
import ConferenceModal from "./ConferenceModal";
import { useConferenceStore } from "../../store/conferenceStore";

const truncateConferenceName = (name: string) => {
  if (name.length > 34) {
    return name.substring(0, 34) + "...";
  } else {
    return name;
  }
};

export default function Conference({ item, deleteConference }: any) {
  const [open, setOpen] = useState(false);
  const [openAddConference, setOpenAddConference] = useState(false);
  const editConference = useConferenceStore(
    (state: any) => state.editConference
  );

  return (
    <>
      <ConferenceModal
        open={open}
        setOpen={setOpen}
        // @ts-ignore
        editConference={editConference}
        id={item.id}
        title={item.title}
        link={item.link}
        association={item.association}
        association_link={item.association_link}
        fall_start_date={item.fall_start_date}
        fall_end_date={item.fall_end_date}
        spring_start_date={item.spring_start_date}
        spring_end_date={item.spring_end_date}
        summer_start_date={item.summer_start_date}
        summer_end_date={item.summer_end_date}
        winter_start_date={item.winter_start_date}
        winter_end_date={item.winter_end_date}
        submission_deadline={item.submission_deadline}
        registration_deadline={item.registration_deadline}
        deleteConference={deleteConference}
      />
      <div
        key={item.id}
        className="flex w-full justify-between rounded-lg p-0.5 px-2"
      >
        <div className="flex w-full justify-between items-center whitespace-nowrap">
          <span>{truncateConferenceName(item.title)}</span>
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
          </div>
        </div>
      </div>
    </>
  );
}
