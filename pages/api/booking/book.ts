import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const ycbaResponse = await axios.get(
    `https://api.youcanbook.me/v1/db59aa24-0e41-4cc0-925d-b38e2f23ffce/bookings?fields=AccountIntegrations,id,startsAt,endsAt,cancelled,answers,answers.code,answers.string`,
    {
      headers: {
        authorization: `Basic ZGFrb3RhYnJvd25hZ0BnbWFpbC5jb206YWtfeEtIWFZmTVcyRXo1Y1JFTmFZWGNnY1VtV1o3OXJuaFhqTkhZSGp3VlJmWGN6aDVkaFY=`,
      },
    }
  );
  let filteredMeetings = ycbaResponse.data;
  if (
    body.email !== "ceo@gradcapfinder.com" &&
    body.email !== "dakotabrownag@gmail.com"
  ) {
    filteredMeetings = ycbaResponse.data.filter(
      //@ts-ignore
      (meeting) => meeting.answers[2].string == body.email
    );
  }

  filteredMeetings = filteredMeetings.filter(
    //@ts-ignore
    (meeting) => new Date().getTime() < new Date(meeting.startsAt).getTime()
  );

  //@ts-ignore
  filteredMeetings = filteredMeetings.filter((meeting) => !meeting.cancelled);

  return res.status(200).json(filteredMeetings);
};
