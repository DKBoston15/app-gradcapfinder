import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface IItem {
  name: string;
  dueDate: string;
  id: number;
  index: number;
}

export default function Task({ name, dueDate, id, index }: IItem) {
  return (
    //@ts-ignore
    <Draggable key={id} index={index} draggableId={`${id}`}>
      {(provided) => {
        return (
          <div
            className="rounded-lg bg-white px-4 py-12"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {name}
            <br />
            {dueDate}
          </div>
        );
      }}
    </Draggable>
  );
}
