import React from "react";
import { FaRegClock } from "react-icons/fa";

export default function AlbumThumbnail({
  name,
  url,
  image,
  time,
  setSelectedPlaylist,
}: any) {
  return (
    <div
      className="flex flex-col items-center transform hover:scale-105"
      onClick={() => setSelectedPlaylist(name)}
    >
      <hr
        className={`border-8 border-black w-10/12 border-thumbnailTopOne rounded-t-xl`}
      />
      <hr
        className={`border-8 border-black w-90/100 border-thumbnailTopTwo rounded-t-xl `}
      />
      <div
        className={`relative cursor-pointer h-64 p-2 border-2 border-gray rounded-xl`}
      >
        <img
          src="/video_play_icon_small.svg"
          className="absolute ml-28 mt-14 z-50"
        />
        <img
          src="https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg"
          className="rounded-2xl filter group-hover:brightness-25 brightness-75"
        />
        <p className="mt-2">{name}</p>
        <div className={`flex space-x-4 items-center text-gray`}>
          <FaRegClock />
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
}
