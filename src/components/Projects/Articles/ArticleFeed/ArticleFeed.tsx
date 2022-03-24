import React, { useState, useEffect } from "react";
import { Editor } from "primereact/editor";

export default function ArticleFeed() {
  const [text1, setText1] = useState<string>(
    "<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>"
  );

  useEffect(() => {
    console.log(text1);
  }, [text1]);

  return (
    <div>
      <div className="card">
        <h5>Default</h5>
        <Editor
          style={{ height: "320px" }}
          value={text1}
          onTextChange={(e) => setText1(e.htmlValue)}
        />
      </div>
    </div>
  );
}
