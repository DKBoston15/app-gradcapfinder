import React from "react";

interface IDateLookup {
  [key: string]: string | undefined;
}

export default function Hello() {
  const date = new Date();
  let formattedDate = date.toUTCString();
  formattedDate = formattedDate.slice(0, 16);
  const dateLookup: IDateLookup = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };
  formattedDate = `${
    dateLookup[`${formattedDate.slice(0, 3)}`]
  } ${formattedDate.slice(8, 11)} ${formattedDate.slice(
    4,
    7
  )} ${formattedDate.slice(12, 16)}`;
  return (
    <div className="text-4xl font-bold">
      {`Hello ${"David"}`}
      <span className="ml-4">👋</span>
      <br />
      <span className="text-gray font-normal text-2xl">{formattedDate}</span>
    </div>
  );
}
