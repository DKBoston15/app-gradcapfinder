import React, { useEffect, useState } from "react";
import { useProfileStore } from "../../store/profileStore";
import { supabaseClient } from "../../lib/client";

export default function UniversitySidebar() {
  const profile = useProfileStore((state: any) => state.profile);
  const [university, setUniversity] = useState({});

  // @ts-ignore
  useEffect(async () => {
    let { data: universities, error } = await supabaseClient
      .from("universities")
      .select("*")
      .order("name", { ascending: true })
      .eq("id", profile.university);

    //   @ts-ignore
    setUniversity(universities[0]);
  }, []);

  return (
    <div className="bg-hoverGray dark:bg-darkSlateGray h-full min-w-72 w-72 text-center flex flex-col items-center py-16">
      <img
        // @ts-ignore
        src={university.logo_link}
        className="w-36 h-36 -ml-2 dark:bg-white dark:rounded-xl mb-4"
      />
      {/* @ts-ignore */}
      <h1 className="text-3xl font-semibold px-2">{university.name}</h1>
      <ul className="mt-12 space-y-8">
        <li>
          <button
            className={`font-bold text-black rounded-lg py-2 px-12 w-60 my-1 mr-1 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
            // @ts-ignore
            onClick={() => window.open(university.home_link, "_blank")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`font-bold text-black rounded-lg py-2 px-12 w-60 my-1 mr-1 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
            // @ts-ignore
            onClick={() => window.open(university.library_link, "_blank")}
          >
            Library
          </button>
        </li>
        <li>
          <button
            className={`font-bold text-black rounded-lg py-2 px-12 w-60 my-1 mr-1 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
            // @ts-ignore
            onClick={() => window.open(university.career_center_link, "_blank")}
          >
            Career Center
          </button>
        </li>
        <li>
          <button
            className={`font-bold text-black rounded-lg py-2 px-12 w-60 my-1 mr-1 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
            onClick={() =>
              // @ts-ignore
              window.open(university.student_portal_link, "_blank")
            }
          >
            Student Portal
          </button>
        </li>
        <li>
          <button
            className={`font-bold text-black rounded-lg py-2 px-12 w-60 my-1 mr-1 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
            onClick={() =>
              // @ts-ignore
              window.open(university.student_services_link, "_blank")
            }
          >
            Student Services
          </button>
        </li>
      </ul>
      <hr className="bg-dark h-1 w-90/100 mt-12 mb-12" />
      <h1 className="text-xl font-semibold px-4 -ml-2 mb-12">
        Federal FASFA Deadlines
      </h1>
      <div className="rounded-xl bg-silver dark:bg-black flex flex-col space-y-4 p-4 w-60">
        <span>Open Date: Oct. 1st</span>
        <span>Close Date: June 30th</span>
      </div>
      <button
        className={`mt-12 font-bold text-black rounded-lg py-2 px-12 w-60 my-1 mr-1 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
        // @ts-ignore
        onClick={() => window.open(university.fasfa_link, "_blank")}
      >
        University Financial Aid
      </button>
    </div>
  );
}
