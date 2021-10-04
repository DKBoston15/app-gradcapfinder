import React, { useState } from "react";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import VideoModal from "../VideoLibraryComponents/VideoModal";

export default function AlbumListThumbnail({
  name,
  id,
  thumbnail,
  date,
  time,
  url,
}: any) {
  const [showConfirm, setShowConfirm] = useState(false);
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
        className="flex ml-12 hover:bg-porcelain rounded-2xl w-full p-4 cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        <div className="relative">
          <img src={thumbnail} className="rounded-2xl" />
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
