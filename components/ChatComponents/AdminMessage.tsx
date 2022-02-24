import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";
// @ts-ignore
import Identicon from "react-identicons";
import { convertOtherTimezoneToLocalTimezone } from "../../helpers/index";
import moment from "moment";

export default function AdminMessage({
  message,
  user,
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
      <>
        {user?.id && (
          <div>
            <div
              className={`flex items-center ${
                message.user_id === user?.id ? "justify-end" : ""
              }`}
            >
              <div
                className={`flex flex-col space-y-2 text-xl max-w-xs mx-2 rounded-full"  ${
                  message.user_id === user?.id
                    ? "bg-darkSlateGray text-white items-end order-1 rounded-bl-lg rounded-tr-lg rounded-tl-lg"
                    : "bg-white dark:bg-primary items-start order-2 rounded-tl-lg rounded-tr-lg rounded-br-lg"
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
              <div
                className={`order-0 text-gray ${
                  message.user_id === user?.id ? "order-0" : "order-2"
                }`}
              >
                {convertOtherTimezoneToLocalTimezone(
                  message.created_at,
                  message.timezone
                )}
              </div>
              {message.user_id !== user?.id && (
                <>
                  {!avatarUrl && (
                    <Identicon string={message.user_id} size={55} />
                  )}
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt="My profile"
                      className="w-12 h-12 rounded-full order-1"
                    />
                  )}
                </>
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
    </>
  );
}
