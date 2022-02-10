import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";

export default function Header({ adminName }: any) {
  return (
    <div className="bg-white dark:bg-black h-9/100 flex flex-col justify-center pl-8 mb-8 border-l-2 border-dashGray dark:border-completeBlack">
      {adminName === "Chat with Dr.Bozeman" && (
        <div className="flex items-center space-x-4 text-4xl">
          <span className="text-blue">
            <FaChalkboardTeacher />
          </span>
          <span className="font-semibold">Dr. Bozeman</span>
        </div>
      )}
      {adminName === "Chat with Tech Support" && (
        <div className="flex items-center space-x-4 text-4xl">
          <span className="text-green">
            <FaHatWizard />
          </span>
          <span className="font-semibold">Tech Support</span>
        </div>
      )}
    </div>
  );
}
