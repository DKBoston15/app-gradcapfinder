import React, { useEffect, useState } from "react";
import { useProfileStore } from "../store/profileStore";
import { supabaseClient } from "../lib/client";
import Identicon from "react-identicons";

export default function profileTest() {
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const profile = useProfileStore((state: any) => state.profile);
  const updateProfile = useProfileStore((state: any) => state.updateProfile);
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(async () => {
    if (profile) {
      const url = await getProfileImageUrl(profile.avatar_url);
      setAvatarUrl(url);
    }
  }, [profile]);

  useEffect(() => {
    updateProfile("1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f", "Dakota 2");
  }, []);

  //@ts-ignore
  useEffect(async () => {
    getProfile("1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f");
  }, []);

  return (
    <div>
      {JSON.stringify(profile)}
      <img src={avatarUrl} />
      <Identicon string="randomness" />
    </div>
  );
}
