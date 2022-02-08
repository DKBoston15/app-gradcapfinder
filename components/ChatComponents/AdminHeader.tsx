import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";
import { useProfileStore } from "../../store/profileStore";
import Identicon from "react-identicons";
import { supabaseClient } from "../../lib/client";

export default function Header({ selectedDiscussion, discussions }: any) {
  const [name, setName] = useState("");
  const user = supabaseClient.auth.user();
  const [userId, setUserId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );

  useEffect(async () => {
    if (discussions && selectedDiscussion) {
      const filteredDiscussions = discussions.filter(
        (discussion) => discussion.id == selectedDiscussion
      );
      const userName = `${filteredDiscussions[0].profiles.first_name} ${filteredDiscussions[0].profiles.last_name}`;
      setName(userName);
      setUserId(filteredDiscussions[0].profiles.id);
      const url = await getProfileImageUrl(
        filteredDiscussions[0].profiles.avatar_url
      );

      if (url) {
        setAvatarUrl(url);
      } else {
        setAvatarUrl("");
      }
    }
  }, [selectedDiscussion, discussions]);

  return (
    <div className="bg-white dark:bg-black h-9/100 flex flex-col justify-center pl-8 mb-8 border-l-2 border-dashGray dark:border-none">
      <div className="flex items-center space-x-4 text-4xl">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="My profile"
            className="w-12 h-12 rounded-full order-1"
          />
        )}
        {!avatarUrl && <Identicon string={userId} size={55} />}
        <span className="font-semibold order-2">{name}</span>
      </div>
    </div>
  );
}
