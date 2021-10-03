import React from "react";
import AlbumThumbnailPlaylist from "../VideoLibraryComponents/AlbumThumbnailPlaylist";
import AlbumList from "../VideoLibraryComponents/AlbumList";

export default function PlaylistView({ selectedPlaylist }: any) {
  const videoList = {
    Analysis: {
      info: {
        name: "Analysis",
        videoCount: 4,
        date: "08/01/2021",
      },
      videos: [
        {
          id: 1,
          name: "Video 1",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 2,
          name: "Video 2",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 3,
          name: "Video 3",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 4,
          name: "Video 4",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
      ],
    },
    Professionalism: {
      info: {
        name: "Professionalism",
        videoCount: 4,
        date: "08/01/2021",
      },
      videos: [
        {
          id: 1,
          name: "Video 1",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 2,
          name: "Video 2",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 3,
          name: "Video 3",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 4,
          name: "Video 4",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
      ],
    },
    Writing: {
      info: {
        name: "Writing",
        videoCount: 4,
        date: "08/01/2021",
      },
      videos: [
        {
          id: 1,
          name: "Video 1",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 2,
          name: "Video 2",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 3,
          name: "Video 3",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 4,
          name: "Video 4",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
      ],
    },
    "Learning R": {
      info: {
        name: "Learning R",
        videoCount: 4,
        date: "08/01/2021",
      },
      videos: [
        {
          id: 1,
          name: "Video 1",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 2,
          name: "Video 2",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 3,
          name: "Video 3",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
        {
          id: 4,
          name: "Video 4",
          thumbnail: "https://img.youtube.com/vi/382wNisD4Ng/mqdefault.jpg",
          date: "08/12/2021",
          time: "5:23",
        },
      ],
    },
  };
  return (
    <div className="flex w-full h-full mt-8 max-w-6xl">
      <div className="flex flex-col w-3/12 ml-4 items-start">
        <h1 className="font-semibold text-xl mb-8">
          {/* @ts-ignore */}
          {videoList[selectedPlaylist].info.name}
        </h1>
        <AlbumThumbnailPlaylist decoration={false} />
        <h3 className="font-semibold mt-4">
          {/* @ts-ignore */}
          {videoList[selectedPlaylist].info.videoCount} Videos
        </h3>
        <p className="font-gray mt-2">
          {/* @ts-ignore */}
          {`Uploaded on ${videoList[selectedPlaylist].info.date}`}
        </p>
      </div>
      <div className="flex w-9/12 mt-16">
        {/* @ts-ignore */}
        <AlbumList videoList={videoList[selectedPlaylist].videos} />
      </div>
    </div>
  );
}
