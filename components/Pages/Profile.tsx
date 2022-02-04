import { useState, useEffect } from "react";
import { supabaseClient } from "../../lib/client";
import Avatar from "../DashboardComponents/Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";

export default function Account({ session }: any) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [fieldOfStudy, setFieldOfStudy] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [avatar_url, session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabaseClient.auth.user();

      let { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`first_name, last_name, field_of_study, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setFieldOfStudy(data.field_of_study);
        setAvatarUrl(data.avatar_url);
        setLoading(false);
      }
    } catch (error) {
      // @ts-ignore
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  //   @ts-ignore
  async function updateProfile({
    firstName,
    lastName,
    fieldOfStudy,
    avatar_url,
  }: any) {
    try {
      setLoading(true);
      const user = supabaseClient.auth.user();

      const updates = {
        id: user?.id,
        first_name: firstName,
        last_name: lastName,
        field_of_study: fieldOfStudy,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabaseClient.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      // @ts-ignore
      alert(error.message);
    } finally {
      toast.success("Profile Updated!", {
        theme: "colored",
      });
      setLoading(false);
    }
  }

  return (
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
        <div className="form-widget bg-dashGray w-1/2 rounded-xl p-5 flex items-center flex-col">
          {loading && <Loader />}
          {!loading && (
            <>
              <Avatar
                url={avatar_url}
                size={150}
                onUpload={(url: any) => {
                  setAvatarUrl(url);
                  updateProfile({
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
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  name="fieldOfStudy"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                />
              </div>

              <div>
                <button
                  className={`font-bold text-black rounded-lg py-2 px-4 mt-4 w-24 mr-1 text-md cursor-pointer bg-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                  onClick={() =>
                    updateProfile({
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
  );
}
