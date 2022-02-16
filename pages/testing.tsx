import React from "react";
import { formatInTimeZone, zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
import moment from "moment";
import "moment-timezone";

export default function testing() {
  const asyncFunc = async () => {
    const date = new Date();
    const data = await fetch("http://localhost:3000/api/booking/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        email: "ceo@gradcapfinder.com",
      }),
    });
    const response = await data.json();
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const bookerTimezone = response[0].timeZone;

    var hawaii = moment.tz(response[0].startsAt, bookerTimezone);
    var home = hawaii.clone().tz(currentTimeZone).format();
    console.log(home);

    var hawaii2 = moment.tz(response[0].endsAt, bookerTimezone);
    var home2 = hawaii2.clone().tz(currentTimeZone).format();
    console.log(home2);
  };

  asyncFunc();

  return <div>Hello</div>;
}
