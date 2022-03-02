import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";
import { useChatStore } from "../../store/chatStore";

export default function SidebarDiscussion({
  discussion,
  adminDiscussionIds,
  selectedDiscussion,
  setSelectedDiscussion,
}: any) {
  const messages = useChatStore((state: any) => state.messages);
  const [daneLastMessage, setDaneLastMessage] = useState("");
  const [techLastMessage, setTechLastMessage] = useState("");

  const getMessagesByDiscussionId = useChatStore(
    (state: any) => state.getMessagesByDiscussionId
  );

  // @ts-ignore
  useEffect(async () => {
    const messages = await getMessagesByDiscussionId(
      adminDiscussionIds["dane"]
    );
    if (messages) {
      const lastMessagePreDisplay = messages[messages.length - 1];
      if (lastMessagePreDisplay) {
        if (lastMessagePreDisplay.content.length > 15) {
          setDaneLastMessage(
            lastMessagePreDisplay.content.substring(0, 12) + "..."
          );
        } else {
          setDaneLastMessage(lastMessagePreDisplay.content);
        }
      }
    }
  }, [messages]);

  // @ts-ignore
  useEffect(async () => {
    const messages = await getMessagesByDiscussionId(
      adminDiscussionIds["techSupport"]
    );
    if (messages) {
      const lastMessagePreDisplay = messages[messages.length - 1];
      if (lastMessagePreDisplay) {
        if (lastMessagePreDisplay.content.length > 15) {
          setTechLastMessage(
            lastMessagePreDisplay.content.substring(0, 12) + "..."
          );
        } else {
          setTechLastMessage(lastMessagePreDisplay.content);
        }
      }
    }
  }, [messages]);

  return (
    <>
      {discussion === "Dr.Bozeman" && (
        <li
          className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
            selectedDiscussion == adminDiscussionIds["dane"]
              ? "bg-dashGray"
              : "bg-white"
          }`}
          onClick={() => {
            setSelectedDiscussion(adminDiscussionIds["dane"]);
          }}
        >
          <span className="text-blue text-4xl">
            <FaChalkboardTeacher />
          </span>
          <div className="flex flex-col">
            <span className="font-semibold">Dr. Bozeman</span>
            <div className="order-2">
              {daneLastMessage && (
                <div className="text-gray">{daneLastMessage}</div>
              )}
            </div>
          </div>
        </li>
      )}
      {discussion === "Tech Support" && (
        <li
          className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
            selectedDiscussion == adminDiscussionIds["techSupport"]
              ? "bg-dashGray dark:bg-completeBlack"
              : "bg-white dark:bg-black"
          }`}
          onClick={() => {
            setSelectedDiscussion(adminDiscussionIds["techSupport"]);
          }}
        >
          <span className="text-green text-4xl">
            <FaHatWizard />
          </span>
          <div className="flex flex-col">
            <span className="font-semibold">Tech Support</span>
            <div className="order-2">
              {techLastMessage && (
                <div className="text-gray">{techLastMessage}</div>
              )}
            </div>
          </div>
        </li>
      )}
    </>
  );
}
