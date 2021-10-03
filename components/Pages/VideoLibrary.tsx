import React, { useState, useEffect } from "react";
import FeaturedVideoRow from "../VideoLibraryComponents/FeaturedVideoRow";
import VideoCollectionRow from "../VideoLibraryComponents/VideoCollectionRow";
import PlaylistView from "../VideoLibraryComponents/PlaylistView";
import { AiOutlineLeft } from "react-icons/ai";

export default function VideoLibrary() {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [playlistSelected, setPlaylistSelected] = useState(false);
  useEffect(() => {
    console.log(selectedPlaylist);
    if (selectedPlaylist == "") {
      return;
    }
    setPlaylistSelected(true);
  }, [selectedPlaylist]);

  function resetPlaylist() {
    setPlaylistSelected(false);
    setSelectedPlaylist("");
  }

  return (
    <>
      {!playlistSelected ? (
        <div className="w-full p-12 flex flex-col justify-between">
          <h1 className="h-12 text-2xl font-semibold ml-4">Video Library</h1>
          <div className="h-3/6">
            <span className="font-semibold ml-4 text-xl">Featured</span>
            <FeaturedVideoRow />
          </div>
          <div className="h-2/6">
            <span className="font-semibold ml-4 text-xl h-3/6">
              Video Collections
            </span>
            <VideoCollectionRow setSelectedPlaylist={setSelectedPlaylist} />
          </div>
        </div>
      ) : (
        <div className="w-full p-12 flex flex-col">
          <div className="flex text-xl">
            <div
              className={`flex justify-center items-center border-2 border-gray rounded-full w-10 h-10 text-center cursor-pointer`}
              onClick={() => {
                resetPlaylist();
              }}
            >
              <AiOutlineLeft />
            </div>
            <h1 className="h-12 text-2xl font-semibold ml-4">Video Library</h1>
          </div>
          <PlaylistView selectedPlaylist={selectedPlaylist} />
        </div>
      )}
    </>
  );
}
