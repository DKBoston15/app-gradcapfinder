import React from "react";

import { RiFileList2Line } from "react-icons/ri";

export default function Header() {
  return (
    <div
      data-testid="header"
      className="bg-black text-white text-2xl flex justify-end py-4 px-8"
    >
      <div>
        <ul className="flex space-x-4">
          <li>+</li>
        </ul>
      </div>
    </div>
  );
}
