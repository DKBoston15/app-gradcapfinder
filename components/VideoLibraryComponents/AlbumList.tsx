import React from "react";
import AlbumListThumbnail from "../VideoLibraryComponents/AlbumListThumbnail";

export default function AlbumList({ videoList }: any) {
  return (
    <div className="flex flex-col w-full">
      <ul className="space-y-4">
        {videoList.map(({ name, id, thumbnail, date, time, url }: any) => (
          <AlbumListThumbnail
            key={id}
            name={name}
            thumbnail={thumbnail}
            date={date}
            time={time}
            url={url}
          />
        ))}
      </ul>
    </div>
  );
}
