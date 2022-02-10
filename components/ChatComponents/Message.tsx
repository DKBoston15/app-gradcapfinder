import React from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";
// @ts-ignore
import Identicon from "react-identicons";

export default function Message({
  message,
  selectedDiscussion,
  adminName,
  avatarUrl,
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
        {message.sent_from_admin && adminName === "Chat with Dr.Bozeman" && (
          <div className="text-blue text-4xl">
            <FaChalkboardTeacher />
          </div>
        )}
        {message.sent_from_admin && adminName === "Chat with Tech Support" && (
          <div className="text-green text-4xl">
            <FaHatWizard />
          </div>
        )}
        {!message.sent_from_admin && (
          <>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="My profile"
                className="w-12 h-12 rounded-full order-2"
              />
            )}
            {!avatarUrl && (
              <div className="order-2">
                <Identicon string={message.user_id} size={55} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
