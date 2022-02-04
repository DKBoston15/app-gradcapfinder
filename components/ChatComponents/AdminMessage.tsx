import React from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";

export default function AdminMessage({ message, user }: any) {
  return (
    <>
      {user?.id && (
        <div className="">
          <div
            className={`flex items-end ${
              message.user_id === user?.id ? "justify-end" : ""
            }`}
          >
            <div
              className={`flex flex-col space-y-2 text-xl max-w-xs mx-2 rounded-full"  ${
                message.user_id === user?.id
                  ? "bg-darkSlateGray text-white items-end order-1 rounded-bl-lg rounded-tr-lg rounded-tl-lg"
                  : "bg-white items-start order-2 rounded-tl-lg rounded-tr-lg rounded-br-lg"
              }
           `}
            >
              <div
                className={`px-4 py-2 inline-block ${
                  message.user_id === user?.id ? "" : "shadow-md"
                }`}
              >
                <span>
                  {/* @ts-ignore */}
                  {message.content}
                </span>
              </div>
            </div>
            {message.user_id !== user?.id && (
              <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-12 h-12 rounded-full order-1"
              />
            )}
            {message.user_id === user?.id && (
              <div className="text-blue text-4xl order-2">
                <FaChalkboardTeacher />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
