import React from "react";
import AlbumThumbnail from "./AlbumThumbnail";

export default function VideoCollectionRow({ setSelectedPlaylist }: any) {
  return (
    <div className="flex h-full p-4">
      <div className="flex justify-between w-full mt-4 space-x-4">
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Identifying"
          time="1 Hour 47 Minutes - 3 Videos"
          image="https://res.cloudinary.com/gradcapfinder/image/upload/v1633307193/Youtube%20Thumbnails/Identifying_Live_Recorded_Sessions_Youtube_Thumbnail_cbqge3.jpg"
        />
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Selecting"
          time="1 Hour 59 Minutes - 3 Videos"
          image="https://res.cloudinary.com/gradcapfinder/image/upload/v1633307375/Youtube%20Thumbnails/Selecting_Live_Recorded_Sessions_Youtube_Thumbnail_hx4y9e.jpg"
        />
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Interpreting"
          time="1 Hour 20 Minutes - 3 Videos"
          image="https://res.cloudinary.com/gradcapfinder/image/upload/v1633307378/Youtube%20Thumbnails/Interpreting_Live_Recorded_Sessions_Youtube_Thumbnail_fkypsc.jpg"
        />
        <AlbumThumbnail
          setSelectedPlaylist={setSelectedPlaylist}
          name="Designing"
          time="1 Hour 36 Minutes - 3 Videos"
          image="https://res.cloudinary.com/gradcapfinder/image/upload/v1633307382/Youtube%20Thumbnails/Designing_Live_Recorded_Sessions_Youtube_Thumbnail_yr3ioc.jpg"
        />
      </div>
    </div>
  );
}
