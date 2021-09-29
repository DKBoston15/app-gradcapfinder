import React from "react";

export default function VideoThumbnail({ name, url, image, time }: any) {
  return (
    <div className="relative group cursor-pointer">
      <img
        src="/video_play_icon_small.svg"
        className="absolute inset-x-0 p-4 z-50"
      />
      <p className="absolute bottom-0 p-4 z-50 text-white w-full text-lg hidden group-hover:block">
        {name}
      </p>
      <img
        src="https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg"
        className="rounded-2xl filter group-hover:brightness-25 brightness-75"
      />
    </div>
  );
}

// absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
