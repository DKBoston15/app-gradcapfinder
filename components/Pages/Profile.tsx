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
import { useDebouncedCallback } from "use-debounce";

export default function Account({ session, setCurrentPage }: any) {
  const user = supabaseClient.auth.user();
  const profile = useProfileStore((state: any) => state.profile);
  const updateProfile = useProfileStore((state: any) => state.updateProfile);

  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fieldOfStudy, setFieldOfStudy] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [cv_url, setCVUrl] = useState(null);
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

  useEffect(() => {
    const realtimeProfileUpdates = supabaseClient
      .from("profiles")
      .on("*", (payload) => {
        const getProfiles = useProfileStore.getState().getProfiles;
        const getProfile = useProfileStore.getState().getProfile;
        getProfiles();
        const user = supabaseClient.auth.user();
        getProfile(user?.id);
      })
      .subscribe();
  }, []);

  const debouncedProfileUpdate = useDebouncedCallback(() => {
    update({
      firstName,
      lastName,
      fieldOfStudy,
      avatar_url,
      onboarding_complete: true,
      selectedUniversity,
      graduate_status: selectedGraduateStatus,
      cv_url,
    });
  }, 1500);

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
      .select("*")
      .order("name", { ascending: true });

    universities?.forEach((element) => {
      tempOptions.push({ value: element.id, label: element.name });
    });

    // @ts-ignore
    setUniversities(tempOptions);
    if (universities) {
      // @ts-ignore
      const uni = tempOptions.filter(
        (university: any) => university.value == profile.university
      );
      // @ts-ignore
      console.log(uni);
      setSelectedUniversity(uni);
    }

    // @ts-ignore
    const graduateStatus = graduateStatuses.filter(
      (graduateStatus: any) => graduateStatus.value == profile.graduate_status
    );
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
      cv_url,
      inGraduateSchool,
      inCoursework,
      conductingResearch,
      attendingConferences,
      writingProposal,
      writingDissertation,
      lookingForPositions
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
      <div className="xl:w-1/2 p-12 flex xl:flex-row flex-col h-max-h-6xl xl:space-x-24">
        <div className="flex items-center flex-col space-y-8 xl:w-1/2">
          <div className="userInfo pb-14 pt-8 w-full bg-dashGray dark:bg-darkSlateGray rounded-lg flex items-center flex-col">
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
                <div className="w-3/4">
                  <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName || ""}
                    onChange={(e) => {
                      //@ts-ignore
                      setFirstName(e.target.value);
                      debouncedProfileUpdate();
                    }}
                    name="firstName"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-start w-3/4">
                  <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName || ""}
                    onChange={(e) => {
                      //@ts-ignore
                      setLastName(e.target.value);
                      debouncedProfileUpdate();
                    }}
                    name="lastName"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  />
                </div>
                <div className="w-3/4">
                  <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={(e) => {
                      //@ts-ignore
                      setEmail(e.target.value);
                      debouncedProfileUpdate();
                    }}
                    value={session.user.email}
                    name="email"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  />
                </div>
              </>
            )}
          </div>
          <div className="cvInfo bg-dashGray rounded-lg flex space-x-12 w-full dark:bg-darkSlateGray">
            <CV
              url={cv_url}
              size={150}
              onUpload={(url: any) => {
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
          </div>
        </div>
        <div>
          <div className="uniInfo dark:bg-darkSlateGray p-8 bg-dashGray rounded-lg flex flex-col items-center w-full mt-8">
            <div className="flex flex-col justify-start w-full">
              <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                Field Of Study
              </label>
              <input
                id="fieldOfStudy"
                type="text"
                value={fieldOfStudy || ""}
                onChange={(e) => {
                  //@ts-ignore
                  setFieldOfStudy(e.target.value);
                  debouncedProfileUpdate();
                }}
                name="fieldOfStudy"
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              />
            </div>
            {selectedUniversity && (
              <div className="w-full">
                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  University
                </label>
                <div className="mt-2 cursor-pointer">
                  {profile.dark_mode && (
                    <Select
                      value={selectedUniversity}
                      placeholder="Select A University"
                      onChange={(e) => {
                        //@ts-ignore
                        setSelectedUniversity(e);
                        debouncedProfileUpdate();
                      }}
                      options={universities}
                      styles={{
                        input: (provided, state) => ({
                          ...provided,
                          color: "#ffffff",
                        }),
                        control: (provided, state) => ({
                          ...provided,
                          outline: "none",
                          border: "0",
                          height: "50px",
                          borderRadius: "0",
                          cursor: "pointer",
                          backgroundColor: "#3b3b3b",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "white",
                        }),
                        option: (provided) => ({
                          ...provided,
                          color: "white",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#3b3b3b",
                        }),
                      }}
                    />
                  )}
                  {!profile.dark_mode && (
                    <Select
                      value={selectedUniversity}
                      placeholder="Select A University"
                      onChange={(e) => {
                        //@ts-ignore
                        setSelectedUniversity(e);
                        debouncedProfileUpdate();
                      }}
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
                  )}
                </div>
              </div>
            )}
            {selectedGraduateStatus && (
              <div className="w-full">
                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  Graduate Status
                </label>
                <div className="mt-2 cursor-pointer">
                  {profile.dark_mode && (
                    <Select
                      value={selectedGraduateStatus}
                      placeholder="Select A Graduate Status"
                      onChange={(e) => {
                        //@ts-ignore
                        setSelectedGraduateStatus(e);
                        debouncedProfileUpdate();
                      }}
                      // @ts-ignore
                      options={graduateStatuses}
                      styles={{
                        input: (provided, state) => ({
                          ...provided,
                          color: "#ffffff",
                        }),
                        control: (provided, state) => ({
                          ...provided,
                          outline: "none",
                          border: "0",
                          height: "50px",
                          borderRadius: "0",
                          cursor: "pointer",
                          backgroundColor: "#3b3b3b",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "white",
                        }),
                        option: (provided) => ({
                          ...provided,
                          color: "white",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#3b3b3b",
                        }),
                      }}
                    />
                  )}
                  {!profile.dark_mode && (
                    <Select
                      value={selectedGraduateStatus}
                      placeholder="Select A Graduate Status"
                      onChange={(e) => {
                        //@ts-ignore
                        setSelectedGraduateStatus(e);
                        debouncedProfileUpdate();
                      }}
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
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <div className="mt-12">
                <label className="inline-flex items-center">
                  <input
                    checked={inGraduateSchool}
                    onChange={() => {
                      //@ts-ignore
                      setInGraduateSchool(!inGraduateSchool);
                      debouncedProfileUpdate();
                    }}
                    type="checkbox"
                    className="w-8 h-8 accent-primary text-orange-600"
                  />
                  <span className="ml-2">Looking at Graduate Schools</span>
                </label>
              </div>{" "}
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="w-8 h-8"
                    checked={inCoursework}
                    onChange={() => {
                      //@ts-ignore
                      setInCoursework(!inCoursework);
                      debouncedProfileUpdate();
                    }}
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
                    onChange={() => {
                      //@ts-ignore
                      setConductingResearch(!conductingResearch);
                      debouncedProfileUpdate();
                    }}
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
                    onChange={() => {
                      //@ts-ignore
                      setAttendingConferences(!attendingConferences);
                      debouncedProfileUpdate();
                    }}
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
                    onChange={() => {
                      //@ts-ignore
                      setWritingProposal(!writingProposal);
                      debouncedProfileUpdate();
                    }}
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
                    onChange={() => {
                      //@ts-ignore
                      setWritingDissertation(!writingDissertation);
                      debouncedProfileUpdate();
                    }}
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
                    onChange={() => {
                      //@ts-ignore
                      setLookingForPositions(!lookingForPositions);
                      debouncedProfileUpdate();
                    }}
                  />
                  <span className="ml-2">Looking for Positions</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
