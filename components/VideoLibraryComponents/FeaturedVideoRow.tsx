import React from "react";
import FeaturedVideo from "../VideoLibraryComponents/FeaturedVideo";
import VideoThumbnail from "../VideoLibraryComponents/VideoThumbnail";

export default function FeaturedVideoRow() {
  return (
    <div className="flex h-full bg-primary justify-between space-x-4 p-4 relative">
      <FeaturedVideo />
      <div className="w-3/6 mt-8">
        <div>
          <h3>Description</h3>
          <p>Time</p>
        </div>
        <div>
          <VideoThumbnail />
          <VideoThumbnail />
        </div>
      </div>
    </div>
  );
}
