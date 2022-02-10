import React, { useState, useEffect } from "react";
import { useProfileStore } from "../../store/profileStore";
// @ts-ignore
import Identicon from "react-identicons";

export default function AdminSidebarDiscussion({ discussion }: any) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );

  // @ts-ignore
  useEffect(async () => {
    const url = await getProfileImageUrl(discussion.profiles.avatar_url);

    if (url) {
      setAvatarUrl(url);
    } else {
      setAvatarUrl("");
    }
  }, []);

  return (
    <div>
      {!avatarUrl && <Identicon string={discussion.profiles.id} size={55} />}
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="My profile"
          className="w-12 h-12 rounded-full order-1"
        />
      )}

      <span className="font-semibold order-2">
        {`${discussion.profiles.first_name} ${discussion.profiles.last_name}` ||
          "Runner"}
      </span>
    </div>
  );
}
