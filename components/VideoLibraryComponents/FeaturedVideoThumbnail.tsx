import React, { useState } from "react";
import VideoModal from "../VideoLibraryComponents/VideoModal";

export default function VideoThumbnail({ name, url, image, time }: any) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {showConfirm && (
        <VideoModal
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={"https://www.youtube.com/embed/ZQ6fSHr5TJg"}
          name={name}
        />
      )}
      <div
        className="relative group cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        <img
          src="/video_play_icon_small.svg"
          className="absolute inset-x-0 p-4 z-50"
        />
        <p className="absolute bottom-0 p-4 z-50 text-white w-full text-lg hidden group-hover:block">
          {name}
        </p>
        <img
          src="https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg"
          className="rounded-2xl filter group-hover:brightness-25 brightness-75"
        />
      </div>
    </>
  );
}
