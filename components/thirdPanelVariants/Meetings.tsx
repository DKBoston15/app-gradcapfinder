import React, { useEffect, useState } from "react";
import axios from "axios";
import { InlineWidget } from "react-calendly";
import date from "date-and-time";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase";

import { motion } from "framer-motion";

const formatDate = (dateToBeFormatted: string) => {
  const newDate = new Date(dateToBeFormatted);
  return date.format(newDate, "YYYY/MM/DD HH:mm");
};

const isToday = (date: date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const getDuration = (date1: string, date2: string) => {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  return date.subtract(newDate2, newDate1).toHours();
};

export default function Meetings() {
  const [meetings, setMeetings] = useState();
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    const currentDate = new Date();
    let yesterdayDate = currentDate.setDate(currentDate.getDate() - 1);
    const urlDate = new Date(yesterdayDate).toISOString();
    const getMeetings = async () => {
      const res = await axios.get(
        `https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/ADCAWQR76ZMFGYXC&organization=https://api.calendly.com/organizations/CHCHRT2AHE3XUJEC&invitee_email=rianangelica@gmail.com&min_start_time=${urlDate}&count=100`,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjI2NDc0OTkzLCJqdGkiOiI3NmMxZGZmMC04ZDBlLTRjMDktOTJiZC1iY2NkYWFmZmM4MjciLCJ1c2VyX3V1aWQiOiJBRENBV1FSNzZaTUZHWVhDIn0.MH4hS3WnKnQW3zdYSkdpgOVs_qB0uTbTzJyYLw7oDr8",
          },
        }
      );
      if (res.data.collection.length === 0) {
        setMeetings(null);
      } else {
        setMeetings(res.data.collection);
      }
    };
    getMeetings();
  }, []);

  return (
    <div>
      <h1 className="font-poppins text-background font-semibold text-2xl mb-3">
        Meetings
      </h1>
      <hr />
      <h3 className="font-poppins text-background font-semibold text-lg mb-3">
        Existing Meetings
      </h3>
      {meetings && (
        <ul className="ml-4">
          {meetings.map((meeting, index) => (
            //@ts-ignore
            <li key={index}>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <h6 className="font-poppins text-background font-regular text-lg mb-1 mt-2">
                    {meeting.name}{" "}
                  </h6>
                  {isToday(new Date(meeting.start_time)) && (
                    <motion.button
                      className="bg-zoomBlue text-white p-2 rounded-lg hover:bg-zoomBlueHover"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Join Meeting
                    </motion.button>
                  )}
                </div>
                <p>
                  <span className="font-poppins text-background font-semibold">
                    Start Time:
                  </span>{" "}
                  {formatDate(meeting.start_time)}
                </p>
                <p>
                  <span className="font-poppins text-background font-semibold">
                    End Time:
                  </span>{" "}
                  {formatDate(meeting.end_time)}
                </p>
                <p className="mb-2">
                  <span className="font-poppins text-background font-semibold">
                    Duration:
                  </span>{" "}
                  {getDuration(meeting.start_time, meeting.end_time)} Hours
                </p>
                {index != meetings.length - 1 && <hr />}
              </div>
            </li>
          ))}
        </ul>
      )}
      {!meetings && (
        <h6 className="font-poppins text-background font-regular mb-4">
          No Meetings Scheduled. <br />
          Schedule One Below
        </h6>
      )}
      <hr className="mt-5 mb-5" />
      <h3 className="font-poppins text-background font-semibold text-xl mb-3">
        Schedule A New Meeting
      </h3>
      <InlineWidget
        url="https://calendly.com/gradcapfinder/general-meeting"
        prefill={{
          email: "test@test.com",
          firstName: "Jon",
          lastName: "Snow",
          name: "Jon Snow",
        }}
        styles={{
          height: "60vh",
        }}
      />
    </div>
  );
}

// * Get Calendly Meetings Based on User Email
// * Get Calendly Event Types
// TODO Show Future & Maybe Past Meetings
// * Allow For Scheduling Future Meetings
