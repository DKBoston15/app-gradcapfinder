import React, { useState } from "react";
import parse from "html-react-parser";
import { NoteContainer } from "./style";

export default function Note({ entry }: any) {
  return <NoteContainer>{parse(entry.content)}</NoteContainer>;
}
