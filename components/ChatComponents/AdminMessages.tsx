import React from "react";
import AdminMessage from "./AdminMessage";

export default function AdminMessages({
  selectedMessages,
  selectedDiscussion,
  user,
}: any) {
  return (
    <div
      id="messages"
      className="h-85/100 flex flex-col space-y-4 px-8 mb-4 overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {selectedMessages && selectedDiscussion && (
        <>
          {/* @ts-ignore */}
          {selectedMessages.map((message) => (
            //   @ts-ignore
            <AdminMessage key={message.id} message={message} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
