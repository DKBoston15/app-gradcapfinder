import React from "react";
import date from "date-and-time";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import Modal from "./Modal";

export default function MeetingCard({
  meeting,
  cancelMeeting,
  setShowConfirm,
  showConfirm,
  index,
}: any) {
  const openZoomLink = () => {
    window.open("https://us02web.zoom.us/j/2059491199");
  };

  return (
    <>
      <>
        {meeting && (
          <div className="bg-white rounded-lg h-full w-full col-span-1 shadow-md p-2 flex flex-col justify-between h-28">
            <div className="font-bold">
              General Meeting - {meeting.answers[0].string}{" "}
              {meeting.answers[1].string}
            </div>
            <div>
              <div className="flex items-center">
                <span className="mr-2 flex items-center">
                  <AiOutlineClockCircle />:
                </span>
                {date.format(new Date(meeting.startsAt), "h:mm A")}{" "}
                <span className="ml-2 mr-2">-</span>
                {date.format(new Date(meeting.endsAt), "h:mm A")}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2 flex items-center">
                    <AiOutlineCalendar />:
                  </span>
                  {date.format(new Date(meeting.startsAt), "MM/DD/YYYY")}
                </div>
                <div>
                  {index === 0 && (
                    <button
                      className={`font-bold mr-2 text-white rounded-lg py-1 px-2 text-md cursor-pointer bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                      onClick={() => {
                        openZoomLink();
                      }}
                    >
                      Join
                    </button>
                  )}
                  <button
                    className={`font-bold text-black rounded-lg py-1 px-2 text-md cursor-pointer bg-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                    onClick={() => {
                      setShowConfirm(true);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {showConfirm && (
          <Modal
            setShowConfirm={setShowConfirm}
            showConfirm={showConfirm}
            meetingId={meeting.id}
            cancelMeeting={cancelMeeting}
          />
        )}
      </>
    </>
  );
}
