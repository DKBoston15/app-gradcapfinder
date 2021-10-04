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
        <img src={image} className="rounded-2xl" />
      </div>
    </div>
  );
}
