import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { supabaseClient } from "../../lib/client";
import { useTheme } from "next-themes";
import Avatar from "../DashboardComponents/Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProfileStore } from "../../store/profileStore";
import Loader from "../Loader";
import Dropdown from "../Dropdown";

export default function Settings({ session, setCurrentPage }: any) {
  const [soundEffects, setSoundEffects] = useState(false);
  const [localPhoneNumber, setLocalPhoneNumber] = useState();
  const user = supabaseClient.auth.user();
  const { theme, setTheme } = useTheme();
  const [openTab, setOpenTab] = React.useState(1);

  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fieldOfStudy, setFieldOfStudy] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const profile = useProfileStore((state: any) => state.profile);
  const updateProfile = useProfileStore((state: any) => state.updateProfile);
  const sms = useProfileStore((state: any) => state.sms);
  const setSms = useProfileStore((state: any) => state.setSms);
  const phoneNumber = useProfileStore((state: any) => state.phoneNumber);
  const setPhoneNumber = useProfileStore((state: any) => state.setPhoneNumber);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setFieldOfStudy(profile.field_of_study);
      setAvatarUrl(profile.avatar_url);
      setLoading(false);
    }
  }, [profile, session]);

  //   @ts-ignore
  async function update({
    firstName,
    lastName,
    fieldOfStudy,
    avatar_url,
  }: any) {
    setLoading(true);
    const user = supabaseClient.auth.user();

    await updateProfile(
      user?.id,
      firstName,
      lastName,
      fieldOfStudy,
      avatar_url
    );

    toast.success("Profile Updated!", {
      theme: "colored",
    });
    setLoading(false);
  }

  const setPhoneNumberSetting = () => {
    setPhoneNumber(localPhoneNumber);
    toast.success("Phone Number Updated!", {
      theme: "colored",
    });
  };

  useEffect(() => {
    async function getProfile() {
      try {
        let { data, error, status } = await supabaseClient
          .from("profiles")
          .select(`sound_effects`)
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setSoundEffects(data.sound_effects);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, [user]);

  return (
    <div className="w-full p-12 flex flex-col h-max-h-6xl">
      <div className="absolute right-4 top-4">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
      <h1 className="h-12 text-2xl font-semibold ml-4">Settings</h1>
      <hr className="my-4 mb-8 ml-4" />
      <>
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-primary"
                      : "text-primary bg-white border-2 border-primary")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Profile
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-primary"
                      : "text-primary bg-white border-2 border-primary")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Themes
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-primary"
                      : "text-primary bg-white border-2 border-primary")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Notifications
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 4
                      ? "text-white bg-primary"
                      : "text-primary bg-white border-2 border-primary")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Sounds
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-black w-full mb-6rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <>
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
                                  });
                                }}
                              />
                              <div>
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
                              <div>
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
                              <div className="flex flex-col justify-start">
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
                              <div className="flex flex-col justify-start">
                                <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                                  Field Of Study
                                </label>
                                <input
                                  id="fieldOfStudy"
                                  type="text"
                                  value={fieldOfStudy || ""}
                                  //@ts-ignore
                                  onChange={(e) =>
                                    setFieldOfStudy(e.target.value)
                                  }
                                  name="fieldOfStudy"
                                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                />
                              </div>

                              <div>
                                <button
                                  className={`font-bold text-black rounded-lg py-2 px-4 mt-4 w-24 mr-1 text-md cursor-pointer bg-white dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                                  onClick={() =>
                                    update({
                                      firstName,
                                      lastName,
                                      fieldOfStudy,
                                      avatar_url,
                                    })
                                  }
                                  disabled={loading}
                                >
                                  {loading ? "Loading ..." : "Update"}
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <label className="flex items-center ml-4 mb-4">
                      <span className="mr-6">Light Mode</span>
                      {/* @ts-ignore */}
                      <Switch
                        onChange={() =>
                          setTheme(theme === "light" ? "dark" : "light")
                        }
                        onColor="#ee803c"
                        checked={theme === "light"}
                        uncheckedIcon={false}
                      />
                    </label>
                    <label className="flex items-center ml-4 mb-4">
                      <span className="mr-6">Dark Mode (Work In Progress)</span>
                      {/* @ts-ignore */}
                      <Switch
                        onChange={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        onColor="#ee803c"
                        checked={theme === "dark"}
                        uncheckedIcon={false}
                      />
                    </label>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <label className="flex items-center">
                      <span className="mr-6">Bi-Weekly SMS Aphorisms</span>
                      <Switch
                        onChange={() => setSms(!sms)}
                        checked={sms}
                        uncheckedIcon={false}
                        onColor="#ee803c"
                      />
                    </label>
                    <label className="block mt-2 mb-2 mt-8">Phone Number</label>
                    <input
                      className="border-2 border-dashGray px-4 py-2"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phoneNumber || localPhoneNumber}
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      required
                    ></input>
                    <button
                      type="button"
                      // @ts-ignore
                      onChange={(e) => setLocalPhoneNumber(e.target.value)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setPhoneNumberSetting();
                      }}
                    >
                      Save
                    </button>
                  </div>
                  <div
                    className={openTab === 4 ? "block" : "hidden"}
                    id="link1"
                  >
                    <label className="flex items-center ml-4">
                      <span className="mr-6">Sound Effects</span>
                      <Switch
                        onChange={() => setSoundEffects(!soundEffects)}
                        checked={soundEffects}
                        uncheckedIcon={false}
                        onColor="#ee803c"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
