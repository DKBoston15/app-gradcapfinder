import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function VideoModal({
  showConfirm,
  setShowConfirm,
  url,
  name,
}: any) {
  const opts = {
    height: "500",
    width: "100%",
  };

  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-75 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
      onClick={() => setShowConfirm(!showConfirm)}
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div
        className="w-full  max-w-6xl h-3/4 p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full">
          <div className="flex justify-between text-2xl">
            {name}
            <AiOutlineClose
              className="cursor-pointer transform hover:scale-110"
              onClick={() => setShowConfirm(!showConfirm)}
            />
          </div>
          <iframe
            className="absolute left-0 w-full h-92/100 bottom-0 border-0"
            src={url}
            allow="fullscreen;"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
