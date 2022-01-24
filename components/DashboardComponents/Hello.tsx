import React, { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/client";
interface IDateLookup {
  [key: string]: string | undefined;
}

export default function Hello({}: any) {
  const [name, setName] = useState("");
  const user = supabaseClient.auth.user();
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

  useEffect(() => {
    if (user) {
      supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .then(({ data, error }) => {
          // @ts-ignore
          setName(data[0].username || "Runner");
        });
    }
  }, [user]);

  return (
    <div className="text-4xl font-semibold w-1/5 pt-4 whitespace-nowrap">
      {`Hello ${name}`}
      <span className="ml-4">👋</span>
      <br />
      <span className="text-gray font-normal text-2xl">{formattedDate}</span>
    </div>
  );
}
