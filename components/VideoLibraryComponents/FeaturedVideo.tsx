import React, { useState } from "react";
import VideoModal from "../VideoLibraryComponents/VideoModal";

export default function FeaturedVideo({ name, url, image, time }: any) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {showConfirm && (
        <VideoModal
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={"https://www.youtube.com/embed/JM0vl1EkAxw"}
          name={name}
        />
      )}

      <div
        className="relative group cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        <img
          src="/video_play_icon_large.svg"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        />
        <p className="absolute bottom-0 p-8 z-50 text-white w-full text-lg hidden group-hover:block">
          Welcome to GradCapFinder
        </p>
        <img
          src="https://img.youtube.com/vi/JM0vl1EkAxw/mqdefault.jpg"
          className="rounded-2xl filter group-hover:brightness-25 brightness-75 w-full h-full"
        />
      </div>
    </>
  );
}
