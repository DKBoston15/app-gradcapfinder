import React, { useState, useEffect } from "react";
// @ts-ignore
export default function Schedule() {
  return (
    <div className="w-full p-12 flex flex-col justify-between h-max-h-6xl">
      <iframe
        src="https://gradcapfinder.youcanbook.me/?noframe=true&skipHeaderFooter=true"
        id="ycbmiframegradcapfinder"
        style={{ width: "100%", height: "100%" }}
        //@ts-ignore
        frameborder="0"
        allowtransparency="true"
      ></iframe>
    </div>
  );
}
