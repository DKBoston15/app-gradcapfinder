import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../../firebase";
import MeetingCard from "./MeetingCard";

export default function MeetingsToday() {
  const [meetings, setMeetings] = useState([]);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [meetingCount, setMeetingCount] = useState();

  useEffect(() => {
    const currentDate = new Date();
    let yesterdayDate = currentDate.setDate(currentDate.getDate() - 1);
    const urlDate = new Date(yesterdayDate).toISOString();
    const getMeetings = async () => {
      if (user) {
        const res = await axios.get(
          `https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/ADCAWQR76ZMFGYXC&organization=https://api.calendly.com/organizations/CHCHRT2AHE3XUJEC&invitee_email=${`reginabrodell@gmail.com`}&min_start_time=${urlDate}&count=100`,
          {
            headers: {
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjI2NDc0OTkzLCJqdGkiOiI3NmMxZGZmMC04ZDBlLTRjMDktOTJiZC1iY2NkYWFmZmM4MjciLCJ1c2VyX3V1aWQiOiJBRENBV1FSNzZaTUZHWVhDIn0.MH4hS3WnKnQW3zdYSkdpgOVs_qB0uTbTzJyYLw7oDr8",
            },
          }
        );
        if (res.data.collection.length === 0) {
          setMeetings([]);
        } else {
          // @ts-ignore
          const newArr = [
            // @ts-ignore
            res.data.collection[0],
            // @ts-ignore
            res.data.collection[1],
            // @ts-ignore
            res.data.collection[2],
            // @ts-ignore
            res.data.collection[3],
          ];
          setMeetings([
            // @ts-ignore
            res.data.collection[0],
            // @ts-ignore
            res.data.collection[1],
            // @ts-ignore
            res.data.collection[2],
            // @ts-ignore
            res.data.collection[3],
          ]);
          // @ts-ignore
          setMeetingCount(newArr.length);
          console.log(res.data.collection);
        }
      }
    };
    getMeetings();
  }, []);

  return (
    <div className="bg-dashGray w-1/2 rounded-xl p-5">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-2xl flex items-center">
          <span>Meetings today</span>
          <span className="ml-2 text-sm bg-primary text-white rounded-full px-2 py-1">
            {meetingCount || 0}
          </span>
        </span>
        <button
          className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 text-md cursor-pointer bg-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
          // onClick={() => setCurrentPage("Tasks")}
        >
          View All
        </button>
      </div>
      {meetings.length === 0 && (
        <div className="flex flex-col items-center mt-20 text-xl font-semibold">
          <div>No meetings scheduled for the future!</div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 h-4/5 mt-4">
        {meetings.length > 0 &&
          meetings.map((meeting: any) => <MeetingCard meeting={meeting} />)}
      </div>
    </div>
  );
}
