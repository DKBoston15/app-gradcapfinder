import React from "react";
import FeaturedVideo from "../VideoLibraryComponents/FeaturedVideo";
import FeaturedVideoThumbnail from "./FeaturedVideoThumbnail";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";

export default function FeaturedVideoRow() {
  return (
    <div className="flex h-full justify-between space-x-4 p-4 relative items-end">
      <div className="h-full flex justify-center w-8/12">
        <FeaturedVideo />
      </div>
      <div className="w-3/6 h-full pt-4 mt-8 flex flex-col justify-between">
        <div className="ml-4">
          <h3 className="text-2xl font-bold">
            Welcome to the GradCapFinder Platform!
          </h3>
          <p className="mt-4 mb-8">
            We've custom built this platform for you to assist you in your
            graduate journey. Start here for a quick overview!
          </p>
          <div className="flex space-x-4 items-center text-gray">
            <FaRegCalendar />
            <p>10/01/2021</p>
          </div>

          <div className="flex space-x-4 items-center text-gray mt-2">
            <FaRegClock />
            <p>4:26</p>
          </div>
        </div>
        <div className="flex space-x-4 ml-4">
          <FeaturedVideoThumbnail />
          <FeaturedVideoThumbnail />
        </div>
      </div>
    </div>
  );
}
