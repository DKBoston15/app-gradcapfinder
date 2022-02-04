import React from "react";
import Message from "./Message";

export default function Messages({
  daneMessages,
  selectedDiscussion,
  daneDiscussionId,
  dakotaMessages,
  dakotaDiscussionId,
}: any) {
  return (
    <div
      id="messages"
      className="h-85/100 flex flex-col space-y-4 px-8 mb-4 overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {daneMessages && selectedDiscussion === daneDiscussionId && (
        <>
          {/* @ts-ignore */}
          {daneMessages.map((message) => (
            //   @ts-ignore
            <Message key={message.id} message={message} />
          ))}
        </>
      )}
      {dakotaMessages && selectedDiscussion === dakotaDiscussionId && (
        <>
          {/* @ts-ignore */}
          {dakotaMessages.map((message) => (
            //   @ts-ignore
            <Message
              key={message.id}
              message={message}
              selectedDiscussion={selectedDiscussion}
              daneDiscussionId={daneDiscussionId}
              dakotaDiscussionId={dakotaDiscussionId}
            />
          ))}
        </>
      )}
    </div>
  );
}
