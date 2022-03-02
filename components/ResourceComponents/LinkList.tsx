import React, { useState } from "react";

export default function LinkList() {
  const [selectedLink, setSelectedLink] = useState("jobs");
  const jobSites = [
    { label: "PhDJobs", link: "https://www.phdjobs.com/" },
    {
      label: "The Chronicle of Higher Education",
      link: "https://jobs.chronicle.com/",
    },
    {
      label: "HigherEd Jobs",
      link: "https://www.higheredjobs.com/?locale=en_US",
    },
    { label: "indeed", link: "https://www.higheredjobs.com/?locale=en_US" },
    {
      label: "Science Careers",
      link: "https://jobs.sciencecareers.org/jobs/faculty/",
    },
    { label: "Professor Positions", link: "https://professorpositions.com/" },
  ];
  const grantSites = [
    { label: "Grants.gov", link: "https://www.grants.gov/" },
    {
      label: "National Science Foundation",
      link: "https://beta.nsf.gov/funding/opportunities",
    },
    { label: "Spencer Foundation", link: "https://www.spencer.org/" },
    {
      label: "National Institute of Health",
      link: "https://www.nih.gov/grants-funding",
    },
    { label: "Grants Resource Center", link: "https://www.aascu.org/GRC/" },
    {
      label: "NORD",
      link: "https://rarediseases.org/for-clinicians-and-researchers/research-opportunities/research-grant-program/",
    },
    { label: "Ford Foundation", link: "https://www.fordfoundation.org/" },
  ];
  const journalSites = [
    { label: "Web of Science", link: "https://mjl.clarivate.com/home" },
    { label: "Scimago", link: "https://www.scimagojr.com/journalrank.php" },
    { label: "Directory of open access journals", link: "https://doaj.org/" },
    {
      label: "Oxford Academic",
      link: "https://academic.oup.com/journals/pages/journals_a_to_z",
    },
    { label: "ERIC", link: "https://eric.ed.gov/?journals" },
    { label: "Publons", link: "https://publons.com/journal/?order_by=reviews" },
  ];

  return (
    <div className="dark:bg-darkSlateGray bg-aliceBlue w-96 p-4 pb-8 rounded-lg">
      <div className="flex justify-between text-xl font-semibold px-6">
        {/* @ts-ignore */}
        <div
          className={`cursor-pointer ${
            selectedLink === "jobs"
              ? "underline underline-offset-8"
              : "decoration-primary"
          }`}
          onClick={() => setSelectedLink("jobs")}
        >
          Jobs
        </div>
        {/* @ts-ignore */}
        <div
          className={`cursor-pointer ${
            selectedLink === "grants"
              ? "underline underline-offset-8"
              : "decoration-primary"
          }`}
          onClick={() => setSelectedLink("grants")}
        >
          Grants
        </div>
        {/* @ts-ignore */}
        <div
          className={`cursor-pointer ${
            selectedLink === "journals"
              ? "underline underline-offset-8"
              : "decoration-primary"
          }`}
          onClick={() => setSelectedLink("journals")}
        >
          Journals
        </div>
      </div>
      <ul>
        <div
          className={`flex flex-col justify-center items-center mt-4 space-y-8 ${
            selectedLink === "jobs" ? "block" : "hidden"
          }`}
        >
          {jobSites.map((link: any, index: any) => (
            <li key={index}>
              <button
                className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 w-80 h-12 text-md cursor-pointer bg-white dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                onClick={() => window.open(link.link, "_blank")}
              >
                {link.label}
              </button>
            </li>
          ))}
        </div>
        <div
          className={`flex flex-col justify-center items-center mt-4 space-y-8 ${
            selectedLink === "grants" ? "block" : "hidden"
          }`}
        >
          {grantSites.map((link: any, index: any) => (
            <li key={index}>
              <button
                className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 w-80 h-12 text-md cursor-pointer bg-white dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                onClick={() => window.open(link.link, "_blank")}
              >
                {link.label}
              </button>
            </li>
          ))}
        </div>
        <div
          className={`flex flex-col justify-center items-center mt-4 space-y-8 ${
            selectedLink === "journals" ? "block" : "hidden"
          }`}
        >
          {journalSites.map((link: any, index: any) => (
            <li key={index}>
              <button
                className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 w-80 h-12 text-md cursor-pointer bg-white dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                onClick={() => window.open(link.link, "_blank")}
              >
                {link.label}
              </button>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
