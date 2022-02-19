import { useState, useEffect } from "react";
import { supabaseClient } from "../../lib/client";
import Avatar from "../DashboardComponents/Avatar";
import CV from "../CV";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProfileStore } from "../../store/profileStore";
import Loader from "../Loader";
import Dropdown from "../Dropdown";
import Select from "react-select";

export default function Account({ session, setCurrentPage }: any) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fieldOfStudy, setFieldOfStudy] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [cv_url, setCVUrl] = useState(null);
  const profile = useProfileStore((state: any) => state.profile);
  const updateProfile = useProfileStore((state: any) => state.updateProfile);
  const user = supabaseClient.auth.user();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [selectedGraduateStatus, setSelectedGraduateStatus] = useState([]);

  const [inGraduateSchool, setInGraduateSchool] = useState(false);
  const [inCoursework, setInCoursework] = useState(false);
  const [conductingResearch, setConductingResearch] = useState(false);
  const [attendingConferences, setAttendingConferences] = useState(false);
  const [writingProposal, setWritingProposal] = useState(false);
  const [writingDissertation, setWritingDissertation] = useState(false);
  const [lookingForPositions, setLookingForPositions] = useState(false);

  const graduateStatuses = [
    {
      value: 1,
      label: "Thinking about graduate school",
    },
    { value: 2, label: "Taking classes" },
    { value: 3, label: "Taking Classes, Conducting Research" },
    {
      value: 4,
      label: "Conducting Research, Writing Proposal",
    },
    {
      value: 5,
      label: "Writing Dissertation, Conducting Defense",
    },
    { value: 6, label: "Moving Forward" },
  ];

  // @ts-ignore
  useEffect(async () => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setFieldOfStudy(profile.field_of_study);
      setAvatarUrl(profile.avatar_url);
      setCVUrl(profile.cv_url);
      setLoading(false);
      setInGraduateSchool(profile.in_graduate_school);
      setInCoursework(profile.in_coursework);
      setConductingResearch(profile.conducting_research);
      setAttendingConferences(profile.attending_conferences);
      setWritingProposal(profile.writing_proposal);
      setWritingDissertation(profile.writing_dissertation);
      setLookingForPositions(profile.looking_for_positions);
    }

    // @ts-ignore
    let tempOptions = [];

    let { data: universities, error } = await supabaseClient
      .from("universities")
      .select("*");

    universities?.forEach((element) => {
      tempOptions.push({ value: element.id, label: element.name });
    });

    // @ts-ignore
    setUniversities(tempOptions);
    if (universities) {
      // @ts-ignore
      const uni = tempOptions.filter(
        (university: any) => university.id != profile.university
      );
      // @ts-ignore
      setSelectedUniversity(uni);
    }

    // @ts-ignore
    const graduateStatus = graduateStatuses.filter(
      (graduateStatus: any) => graduateStatus.value == profile.graduate_status
    );
    console.log(graduateStatus);
    // @ts-ignore
    setSelectedGraduateStatus(graduateStatus);
  }, [profile, session]);

  //   @ts-ignore
  async function update({
    firstName,
    lastName,
    fieldOfStudy,
    avatar_url,
    onboarding_complete,
    selectedUniversity,
    graduate_status,
    cv_url,
  }: any) {
    setLoading(true);
    const user = supabaseClient.auth.user();

    await updateProfile(
      user?.id,
      firstName,
      lastName,
      fieldOfStudy,
      avatar_url,
      onboarding_complete,
      selectedUniversity.value,
      graduate_status.value,
      cv_url
    );

    toast.success("Profile Updated!", {
      theme: "colored",
    });
    setLoading(false);
  }

  return (
    <>
      <div className="absolute right-4 top-4">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full p-12 flex flex-col justify-between h-max-h-6xl">
        <div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                checked={inGraduateSchool}
                onChange={setInGraduateSchool(!inGraduateSchool)}
                type="checkbox"
                className="w-8 h-8 accent-primary text-orange-600"
              />
              <span className="ml-2">Participating in Graduate School</span>
            </label>
          </div>{" "}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8"
                checked={inCoursework}
                onChange={setInCoursework(!inCoursework)}
              />
              <span className="ml-2">Participating in Coursework</span>
            </label>
          </div>{" "}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8"
                checked={conductingResearch}
                onChange={setConductingResearch(!conductingResearch)}
              />
              <span className="ml-2">Conducting Research</span>
            </label>
          </div>{" "}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8"
                checked={attendingConferences}
                onChange={setAttendingConferences(!attendingConferences)}
              />
              <span className="ml-2">Attending Conferences</span>
            </label>
          </div>{" "}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8"
                checked={writingProposal}
                onChange={setWritingProposal(!writingProposal)}
              />
              <span className="ml-2">Writing Proposal</span>
            </label>
          </div>{" "}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8"
                checked={writingDissertation}
                onChange={setWritingDissertation(!writingDissertation)}
              />
              <span className="ml-2">Writing Dissertation</span>
            </label>
          </div>{" "}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-8 h-8"
                checked={lookingForPositions}
                onChange={setLookingForPositions(!lookingForPositions)}
              />
              <span className="ml-2">Looking for Positions</span>
            </label>
          </div>
        </div>
        <div className="form-widget bg-dashGray dark:bg-completeBlack w-1/2 rounded-xl p-5 flex items-center flex-col">
          {loading && <Loader />}
          {!loading && (
            <>
              <Avatar
                url={avatar_url}
                size={150}
                onUpload={(url: any) => {
                  setAvatarUrl(url);
                  update({
                    firstName,
                    lastName,
                    fieldOfStudy,
                    avatar_url: url,
                    onboarding_complete: true,
                    selectedUniversity,
                    graduate_status: selectedGraduateStatus,
                    cv_url: cv_url,
                  });
                }}
              />
              <div className="w-1/2">
                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  //@ts-ignore
                  onChange={(e) => setEmail(e.target.value)}
                  value={session.user.email}
                  name="email"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                />
              </div>
              <div className="w-1/2">
                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName || ""}
                  //@ts-ignore
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-start w-1/2">
                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName || ""}
                  //@ts-ignore
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                />
              </div>
              <div className="flex flex-col justify-start w-1/2">
                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  Field Of Study
                </label>
                <input
                  id="fieldOfStudy"
                  type="text"
                  value={fieldOfStudy || ""}
                  //@ts-ignore
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  name="fieldOfStudy"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                />
              </div>
              {selectedUniversity && (
                <div className="w-1/2">
                  <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                    University
                  </label>
                  <div className="mt-2 cursor-pointer">
                    <Select
                      value={selectedUniversity}
                      placeholder="Select A University"
                      onChange={setSelectedUniversity}
                      options={universities}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          outline: "none",
                          border: "0",
                          height: "50px",
                          borderRadius: "0",
                          cursor: "pointer",
                        }),
                      }}
                    />
                  </div>
                </div>
              )}
              {selectedGraduateStatus && (
                <div className="w-1/2">
                  <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                    Graduate Status
                  </label>
                  <div className="mt-2 cursor-pointer">
                    <Select
                      value={selectedGraduateStatus}
                      placeholder="Select A Graduate Status"
                      // @ts-ignore
                      onChange={setSelectedGraduateStatus}
                      // @ts-ignore
                      options={graduateStatuses}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          outline: "none",
                          border: "0",
                          height: "50px",
                          borderRadius: "0",
                          cursor: "pointer",
                        }),
                      }}
                    />
                  </div>
                </div>
              )}
              <CV
                url={cv_url}
                size={150}
                onUpload={(url: any) => {
                  console.log("CV URL", url);
                  setCVUrl(url);
                  update({
                    firstName,
                    lastName,
                    fieldOfStudy,
                    avatar_url: avatar_url,
                    onboarding_complete: true,
                    selectedUniversity,
                    graduate_status: selectedGraduateStatus,
                    cv_url: url,
                  });
                }}
              />

              <div>
                <button
                  className={`font-bold text-black rounded-lg py-2 px-4 mt-4 w-36 mr-1 text-md cursor-pointer bg-white dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                  onClick={() =>
                    update({
                      firstName,
                      lastName,
                      fieldOfStudy,
                      avatar_url,
                      onboarding_complete: true,
                      selectedUniversity,
                      graduate_status: selectedGraduateStatus,
                      cv_url,
                    })
                  }
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Update Profile"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
