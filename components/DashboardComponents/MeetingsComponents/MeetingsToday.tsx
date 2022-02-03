import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { supabaseClient } from "../../../lib/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MeetingsToday({ setCurrentPage }: any) {
  const [meetings, setMeetings] = useState([]);
  const [meetingCount, setMeetingCount] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const user = supabaseClient.auth.user();

  const getWordFile = async (urlDate: any, email: string) => {
    const data = await fetch("/api/booking/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: urlDate,
        email,
      }),
    });
    const response = await data.json();
    getMeetings(response);
  };

  const cancelMeeting = async (bookingId: string) => {
    toast.success("Meeting Cancelled!", {
      theme: "colored",
    });
    const data = await fetch("/api/booking/cancel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId,
      }),
    });
    const currentDate = new Date();
    let yesterdayDate = currentDate.setDate(currentDate.getDate() - 1);
    const urlDate = new Date(yesterdayDate).toISOString();
    setTimeout(() => {
      if (user) {
        //@ts-ignore
        getWordFile(urlDate, user.email);
      }
    }, 2000);
  };

  const getMeetings = async (res: any) => {
    //@ts-ignore
    setMeetingCount(0);
    if (user) {
      //@ts-ignore
      const sortedMeetings = res.sort((a, b) =>
        a.startsAt > b.startsAt ? 1 : -1
      );
      if (res.length === 0) {
        setMeetings([]);
      } else {
        // @ts-ignore
        let newArr = [
          // @ts-ignore
          sortedMeetings[0],
          // @ts-ignore
          sortedMeetings[1],
          // @ts-ignore
          sortedMeetings[2],
          // @ts-ignore
          sortedMeetings[3],
        ];
        newArr = newArr.filter(function (x) {
          return x !== undefined;
        });
        // @ts-ignore
        setMeetings(newArr);
        // @ts-ignore
        if (sortedMeetings > 4) {
          // @ts-ignore
          setMeetingCount("4+");
        } else {
          // @ts-ignore
          setMeetingCount(newArr.length);
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      const currentDate = new Date();
      let yesterdayDate = currentDate.setDate(currentDate.getDate() - 1);
      const urlDate = new Date(yesterdayDate).toISOString();
      //@ts-ignore
      getWordFile(urlDate, user.email);
    }
  }, []);

  return (
    <>
      <div className="bg-dashGray w-1/2 rounded-xl p-5 h-84">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex justify-between w-full">
          <span className="font-semibold text-2xl flex items-center">
            <span>Upcoming Meetings</span>
            <span className="ml-2 text-sm bg-primary text-white rounded-full px-2 py-1">
              {meetingCount || 0}
            </span>
          </span>
          <button
            className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 text-md cursor-pointer bg-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
            onClick={() => setCurrentPage("Schedule")}
          >
            Schedule
          </button>
        </div>
        {meetings.length === 0 && (
          <div className="flex flex-col items-center mt-20 text-xl font-semibold">
            <div>No meetings scheduled for the future!</div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 h-3/5 mt-4">
          {meetings.length > 0 &&
            meetings.map((meeting: any, index: number) => (
              <MeetingCard
                index={index}
                meeting={meeting}
                cancelMeeting={cancelMeeting}
                setShowConfirm={setShowConfirm}
                showConfirm={showConfirm}
              />
            ))}
        </div>
      </div>
    </>
  );
}
