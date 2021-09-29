import React from "react";
import FeaturedVideoRow from "../VideoLibraryComponents/FeaturedVideoRow";
import VideoCollectionRow from "../VideoLibraryComponents/VideoCollectionRow";

export default function VideoLibrary() {
  return (
    <div className="w-full p-12 flex flex-col justify-between">
      <h1 className="h-12 text-2xl font-semibold ml-4">Video Library</h1>
      <div className="h-3/6">
        <span className="font-semibold ml-4 text-xl">Featured</span>
        <FeaturedVideoRow />
      </div>
      <VideoCollectionRow />
    </div>
  );
}
