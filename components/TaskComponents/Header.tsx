import React from "react";

import { RiFileList2Line } from "react-icons/ri";

export default function Header() {
  return (
    <div data-testid="header" className="">
      <div className="">
        <RiFileList2Line /> Tasks
      </div>
      <div>
        <ul>
          <li>+</li>
          <li>Pizza Slice</li>
        </ul>
      </div>
    </div>
  );
}
