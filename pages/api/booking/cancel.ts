import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  console.log(body);
  const ycbaResponse = await axios.delete(
    `https://api.youcanbook.me/v1/bookings/${body.bookingId}`,
    {
      headers: {
        authorization: `Basic ZGFrb3RhYnJvd25hZ0BnbWFpbC5jb206YWtfeEtIWFZmTVcyRXo1Y1JFTmFZWGNnY1VtV1o3OXJuaFhqTkhZSGp3VlJmWGN6aDVkaFY=`,
      },
    }
  );

  if (ycbaResponse.status === 204) {
    return res.status(200).send("Success");
  }

  return res.status(404).send("Failure");
};
