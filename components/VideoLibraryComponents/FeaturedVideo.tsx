import React from "react";

export default function FeaturedVideo() {
  return (
    <>
      <div
        className="flex w-3/6 rounded-xl relative  filter brightness-50 mt-6 h-5/6 bg-black"
        style={{
          backgroundImage:
            "url(https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundClip: "content-box",
        }}
      >
        <img
          src="/video_play_icon.svg"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        />
      </div>
    </>
  );
}
