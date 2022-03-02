import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";
// @ts-ignore
import Identicon from "react-identicons";
import { convertOtherTimezoneToLocalTimezone } from "../../helpers/index";
import moment from "moment";

export default function Message({
  message,
  selectedDiscussion,
  adminName,
  avatarUrl,
  index,
  array,
}: any) {
  const [divider, setDivider] = useState(undefined);
  useEffect(() => {
    if (index != 0) {
      const currentDate = convertOtherTimezoneToLocalTimezone(
        array[index].created_at,
        array[index].timezone,
        true
      );
      const previousDate = convertOtherTimezoneToLocalTimezone(
        array[index - 1].created_at,
        array[index - 1].timezone,
        true
      );
      if (currentDate != previousDate) {
        // @ts-ignore
        setDivider(currentDate);
      }
    } else {
      const currentDate = convertOtherTimezoneToLocalTimezone(
        array[index].created_at,
        array[index].timezone,
        true
      );
      // @ts-ignore
      setDivider(currentDate);
    }
  }, []);

  return (
    <>
      {divider && (
        <div className="w-full flex justify-center my-8">
          <div className="bg-white dark:bg-black shadow-md rounded-xl w-28 h-8 font-semibold whitespace-nowrap flex items-center justify-center">
            {divider}
          </div>
        </div>
      )}
      <div className="">
        <div
          className={`flex items-center ${
            message.sent_from_admin ? "" : "justify-end"
          }`}
        >
          <div
            className={`flex flex-col space-y-2 text-xl max-w-xl break-all mx-2 rounded-full"  ${
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
          <div
            className={`order-0 text-gray ${
              message.sent_from_admin ? "order-3" : "order-="
            }`}
          >
            {convertOtherTimezoneToLocalTimezone(
              message.created_at,
              message.timezone
            )}
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
    </>
  );
}
