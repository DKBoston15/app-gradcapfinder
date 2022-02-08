import React from "react";

export default function NewMessage({ sendMessage, message }: any) {
  return (
    <div className="bg-white dark:bg-black px-16 py-4">
      {/* @ts-ignore */}
      <form onSubmit={sendMessage} className="flex items-center">
        {/* @ts-ignore */}
        <input
          placeholder="Enter message here..."
          required
          ref={message}
          className="w-full mr-2 focus:outline-none focus:none focus:none bg-dashGray dark:bg-completeBlack rounded-lg px-4 py-3"
        ></input>
        <button
          type="submit"
          className={`font-bold text-white rounded-xl py-2 px-6 ml-2 text-md cursor-pointer bg-primary`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
