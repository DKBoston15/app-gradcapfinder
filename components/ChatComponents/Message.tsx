import React from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";

export default function Message({
  message,
  selectedDiscussion,
  daneDiscussionId,
  dakotaDiscussionId,
}: any) {
  return (
    <div className="">
      <div
        className={`flex items-end ${
          message.sent_from_admin ? "" : "justify-end"
        }`}
      >
        <div
          className={`flex flex-col space-y-2 text-xl max-w-xs mx-2 rounded-full"  ${
            message.sent_from_admin
              ? "bg-white items-start order-2 rounded-tl-lg rounded-tr-lg rounded-br-lg"
              : "bg-darkSlateGray text-white items-end order-1 rounded-bl-lg rounded-tr-lg rounded-tl-lg"
          }
         `}
        >
          <div
            className={`px-4 py-2 inline-block ${
              message.sent_from_admin ? "shadow-md" : ""
            }`}
          >
            <span>
              {/* @ts-ignore */}
              {message.content}
            </span>
          </div>
        </div>
        {message.sent_from_admin && selectedDiscussion === daneDiscussionId && (
          <div className="text-blue text-4xl">
            <FaChalkboardTeacher />
          </div>
        )}
        {message.sent_from_admin && selectedDiscussion === dakotaDiscussionId && (
          <div className="text-green text-4xl">
            <FaHatWizard />
          </div>
        )}
        {!message.sent_from_admin && (
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            className="w-12 h-12 rounded-full order-2"
          />
        )}
      </div>
    </div>
  );
}
