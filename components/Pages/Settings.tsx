import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { supabaseClient } from "../../lib/client";
import { useTheme } from "next-themes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProfileStore } from "../../store/profileStore";
import Dropdown from "../Dropdown";

export default function Settings({ session, setCurrentPage }: any) {
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
  const setSms = useProfileStore((state: any) => state.setSms);
  const setPhoneNumber = useProfileStore((state: any) => state.setPhoneNumber);
  const setSoundEffects = useProfileStore(
    (state: any) => state.setSoundEffects
  );
  const setDarkMode = useProfileStore((state: any) => state.setDarkMode);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setFieldOfStudy(profile.field_of_study);
      setAvatarUrl(profile.avatar_url);
      setLoading(false);
      setTheme(profile.dark_mode ? "dark" : "light");
    }
  }, [profile, session]);

  const setPhoneNumberSetting = () => {
    setPhoneNumber(user?.id, localPhoneNumber);
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
      <div className="absolute right-4 top-4">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
      <h1 className="h-12 text-2xl font-semibold ml-4">Settings</h1>
      <hr className="my-4 mb-8 ml-4" />
      <>
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row "
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-primary"
                      : "text-primary bg-white dark:bg-darkSlateGray dark:text-white border-2 border-primary")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
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
                    (openTab === 2
                      ? "text-white bg-primary"
                      : "text-primary bg-white dark:bg-darkSlateGray dark:text-white border-2 border-primary")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
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
                    (openTab === 3
                      ? "text-white bg-primary"
                      : "text-primary bg-white dark:bg-darkSlateGray dark:text-white border-2 border-primary")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
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
                <div className={openTab === 1 ? "block" : "hidden"} id="link2">
                  <label className="flex items-center ml-4 mb-4">
                    <span className="mr-6">Light Mode</span>
                    {/* @ts-ignore */}
                    <Switch
                      onChange={() => {
                        setDarkMode(user?.id, false);
                        setTheme(theme === "light" ? "dark" : "light");
                      }}
                      onColor="#ee803c"
                      checked={profile.dark_mode === false}
                      uncheckedIcon={false}
                    />
                  </label>
                  <label className="flex items-center ml-4 mb-4">
                    <span className="mr-6">Dark Mode (Work In Progress)</span>
                    {/* @ts-ignore */}
                    <Switch
                      onChange={() => {
                        setDarkMode(user?.id, true);
                        setTheme(theme === "dark" ? "light" : "dark");
                      }}
                      onColor="#ee803c"
                      checked={profile.dark_mode === true}
                      uncheckedIcon={false}
                    />
                  </label>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link3">
                  <label className="flex items-center">
                    <span className="mr-6">Bi-Weekly SMS Aphorisms</span>
                    <Switch
                      onChange={() => setSms(user?.id, !profile.sms)}
                      checked={profile.sms}
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
                    value={profile.phone_number || localPhoneNumber}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={(e) => {
                      // @ts-ignore
                      setLocalPhoneNumber(e.target.value);
                    }}
                  ></input>
                  <button
                    type="button"
                    // @ts-ignore
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setPhoneNumberSetting();
                    }}
                  >
                    Save
                  </button>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link1">
                  <label className="flex items-center ml-4">
                    <span className="mr-6">Sound Effects</span>
                    <Switch
                      onChange={() =>
                        setSoundEffects(user?.id, !profile.sound_effects)
                      }
                      checked={profile.sound_effects}
                      uncheckedIcon={false}
                      onColor="#ee803c"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
