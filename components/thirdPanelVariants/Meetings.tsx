import React from "react";
import { InlineWidget } from "react-calendly";

export default function Meetings() {
  return (
    <div>
      <h1 className="font-poppins text-background font-semibold text-2xl mb-3">
        Meetings
      </h1>
      <hr />
      <h3 className="font-poppins text-background font-semibold text-xl mb-3">
        Existing Meetings
      </h3>
      <hr />
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

// TODO Get Calendly Meetings Based on User Email
// TODO Get Calendly Event Types
// TODO Show Future & Maybe Past Meetings
// TODO Allow For Scheduling Future Meetings

// {
//     "method": "get",
//     "url": "https://api.calendly.com/scheduled_events",
//     "query": {
//       "user": "https://api.calendly.com/users/ADCAWQR76ZMFGYXC",
//       "organization": "https://api.calendly.com/organizations/CHCHRT2AHE3XUJEC",
//       "invitee_email": "katharig@usc.edu",
//       "min_start_time": "2021-07-16T17:00:00.000000Z",
//       "count": "100"
//     },
//     "headers": {
//       "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjI2NDc0OTkzLCJqdGkiOiI3NmMxZGZmMC04ZDBlLTRjMDktOTJiZC1iY2NkYWFmZmM4MjciLCJ1c2VyX3V1aWQiOiJBRENBV1FSNzZaTUZHWVhDIn0.MH4hS3WnKnQW3zdYSkdpgOVs_qB0uTbTzJyYLw7oDr8"
//     }
//   }

// eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjI2NDc0OTkzLCJqdGkiOiI3NmMxZGZmMC04ZDBlLTRjMDktOTJiZC1iY2NkYWFmZmM4MjciLCJ1c2VyX3V1aWQiOiJBRENBV1FSNzZaTUZHWVhDIn0.MH4hS3WnKnQW3zdYSkdpgOVs_qB0uTbTzJyYLw7oDr8
