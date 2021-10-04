import React, { useState } from "react";
import VideoModal from "../VideoLibraryComponents/VideoModal";

export default function VideoThumbnail({ name, url, image, time }: any) {
  const [showConfirm, setShowConfirm] = useState(false);
  const videoID = url.substring(url.lastIndexOf("/") + 1);

  return (
    <>
      {showConfirm && (
        <VideoModal
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={url}
          name={name}
        />
      )}
      <div
        className="relative group cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        <p className="absolute bottom-0 p-4 z-50 text-white w-full text-lg hidden group-hover:block">
          {name}
        </p>
        <img
          src={`https://img.youtube.com/vi/${videoID}/mqdefault.jpg`}
          className="rounded-2xl filter group-hover:brightness-25"
        />
      </div>
    </>
  );
}
