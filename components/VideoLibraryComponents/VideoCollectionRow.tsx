import React from "react";
import AlbumThumbnail from "./AlbumThumbnail";

export default function VideoCollectionRow({ setSelectedPlaylist }: any) {
  return (
    <div className="flex h-full p-4">
      <div className="flex justify-between w-full mt-4 space-x-4">
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Analysis"
          time="18:28 - 4 Videos"
        />
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Writing"
          time="12:23 - 2 Videos"
        />
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Professionalism"
          time="14:13 - 5 Videos"
        />
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Learning R"
          time="128:28 - 14 Videos"
        />
      </div>
    </div>
  );
}
