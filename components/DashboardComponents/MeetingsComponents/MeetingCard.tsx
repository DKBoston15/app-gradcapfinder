import React from "react";
import date from "date-and-time";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";

export default function MeetingCard({ meeting }: any) {
  return (
    <div className="bg-white rounded-lg h-full w-full col-span-1 shadow-md p-2 flex flex-col justify-between hover:transform hover:scale-105">
      <div className="font-bold">{meeting.name}</div>
      <div>
        <div className="flex items-center">
          <span className="mr-2 flex items-center">
            <AiOutlineClockCircle />:
          </span>
          {date.format(new Date(meeting.start_time), "h:mm A")}{" "}
          <span className="ml-2 mr-2">-</span>
          {date.format(new Date(meeting.end_time), "h:mm A")}
        </div>
        <div className="flex items-center">
          <span className="mr-2 flex items-center">
            <AiOutlineCalendar />:
          </span>
          {date.format(new Date(meeting.start_time), "MM/DD/YYYY")}
        </div>
      </div>
    </div>
  );
}
