import React from "react";

export default function AlbumThumbnail({
  name,
  url,
  image,
  time,
  setSelectedPlaylist,
}: any) {
  return (
    <div className="flex flex-col items-center">
      <div className={`relative p-2 border-2 border-gray rounded-xl`}>
        <img
          src="https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg"
          className="rounded-2xl filter group-hover:brightness-25 brightness-75"
        />
      </div>
    </div>
  );
}
