import React, { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/client";
const hdate = require("human-date");
import { getDate, sub } from "date-fns";
interface IDateLookup {
  [key: string]: string | undefined;
}

export default function Hello({}: any) {
  const [name, setName] = useState("");
  const user = supabaseClient.auth.user();
  let date = new Date().getDay();
  const dateLookup: IDateLookup = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  useEffect(() => {
    if (user) {
      supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .then(({ data, error }) => {
          // @ts-ignore
          setName(data[0].first_name || "Runner");
        });
    }
  }, [user]);

  return (
    <div className="text-4xl font-semibold w-1/5 pt-4 whitespace-nowrap">
      {`Hello ${name}`}
      <span className="ml-4">👋</span>
      <br />
      <span className="text-gray font-normal text-2xl">
        {dateLookup[date]}, {hdate.prettyPrint(new Date())}
      </span>
    </div>
  );
}
