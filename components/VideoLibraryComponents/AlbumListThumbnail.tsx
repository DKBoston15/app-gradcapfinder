import React, { useState } from "react";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import VideoModal from "../VideoLibraryComponents/VideoModal";

export default function AlbumListThumbnail({
  name,
  id,
  thumbnail,
  date,
  time,
}: any) {
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
        className="flex ml-12 hover:bg-porcelain rounded-2xl w-full p-4 cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        <div className="relative">
          <img
            src="/video_play_icon_small.svg"
            className="absolute inset-x-0 p-4 z-50"
          />
          <img src={thumbnail} className="rounded-2xl brightness-75" />
        </div>
        <div className="ml-4">
          <div className="text-2xl font-semibold mb-8">{name}</div>
          <div className="flex space-x-4 items-center text-gray mt-2">
            <FaRegCalendar />
            <p>{date}</p>
          </div>
          <div className="flex space-x-4 items-center text-gray mt-2">
            <FaRegClock />
            <p>{time}</p>
          </div>
        </div>
      </div>
    </>
  );
}
