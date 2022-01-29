import React from "react";

export default function Modal({
  setShowConfirm,
  showConfirm,
  cancelMeeting,
  meetingId,
}: any) {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
      onClick={() => setShowConfirm(!showConfirm)}
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div
        className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 flex items-center text-red-500 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <h2 className="text-xl font-bold py-4 ">
              Are you sure you want to cancel this meeting?
            </h2>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              type="button"
              onClick={() => {
                cancelMeeting(meetingId);
                setShowConfirm(!showConfirm);
              }}
            >
              Cancel Meeting
            </button>
            <span
              className="ml-4 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              Keep Meeting
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}