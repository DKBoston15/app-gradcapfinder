import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Tasks } from "./Tasks";
export default function Content() {
  const [active, setActive] = useState("inbox");
  return (
    <section className="flex h-full">
      <Sidebar setActive={setActive} />
      <Tasks active={active} />
    </section>
  );
}
