import React from "react";
import Sidebar from "./Sidebar";
import { Tasks } from "./Tasks";
export default function Content() {
  return (
    <section className="flex h-full">
      <Sidebar />
      <Tasks />
    </section>
  );
}
