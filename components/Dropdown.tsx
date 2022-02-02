import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { supabaseClient } from "../lib/client";
import { useRouter } from "next/router";

const Dropdown = ({ setCurrentPage, user }: any) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const router = useRouter();

  //@ts-ignore
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [avatarUrl, setAvatarUrl] = useState(
    `avatars/${getRandomInt(1, 9)}.png`
  );

  useEffect(() => {
    let avatar_url: string;
    async function getProfile() {
      try {
        let { data, error, status } = await supabaseClient
          .from("profiles")
          .select(`avatar_url`)
          // @ts-ignore
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          console.log(data);
          avatar_url = data.avatar_url;
        }
      } catch (err) {
        console.log(err);
      } finally {
        getProfileImageUrl();
      }
    }

    const getProfileImageUrl = async () => {
      const { signedURL, error } = await supabaseClient.storage
        .from("avatars")
        .createSignedUrl(avatar_url, 60);
      //@ts-ignore
      setAvatarUrl(signedURL);
    };
    getProfile();
  }, [user]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        dropdownPopoverShow &&
        btnDropdownRef.current &&
        //@ts-ignore
        !btnDropdownRef.current.contains(e.target)
      ) {
        setDropdownPopoverShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownPopoverShow]);

  const openDropdownPopover = () => {
    //@ts-ignore
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logout = async () => {
    try {
      await supabaseClient.auth.signOut();

      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div>
          <div
            //@ts-ignore
            ref={btnDropdownRef}
            onClick={() => {
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover();
            }}
          >
            <div className="relative">
              <img
                className="inline object-cover w-16 h-16 mr-2 rounded-full cursor-pointer"
                src={avatarUrl}
                alt="Profile image"
              />
              <div className="absolute top-11 right-1 w-6 h-6 rounded-full bg-white border-2 border-black flex justify-center items-center cursor-pointer">
                <img src="/dropdown_arrow.png" className="w-2 h-2" />
              </div>
            </div>
            <div
              //@ts-ignore
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-white"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white"
                }
                onClick={() => setCurrentPage("Settings")}
              >
                Settings
              </a>
              <a
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white"
                }
                onClick={() => router.push("/changelog")}
              >
                Changelog
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
              <a
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white"
                }
                onClick={() => logout()}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender({ setCurrentPage, user }: any) {
  return (
    <>
      <Dropdown color="white" setCurrentPage={setCurrentPage} user={user} />
    </>
  );
}
