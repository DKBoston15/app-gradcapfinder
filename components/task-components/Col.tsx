import React, { useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import Modal from "../TaskModal";

interface IProps {
  title: string;
  items: { name: string; id: number; dueDate: string; description: string }[];
}

export default function Col({ title, items }: IProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-dashGray rounded-lg h-full w-1/4 p-4">
      <div className="font-bold text-2xl mb-4">{title}</div>
      {/* @ts-ignore */}
      <Droppable droppableId={`${title.replace(/\s+/g, "").toLowerCase()}`}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {items.map((item, index) => (
                <>
                  <Modal
                    open={open}
                    setOpen={setOpen}
                    name={item.name}
                    dueDate={item.dueDate}
                    description={item.description}
                    id={item.id}
                  />
                  <div onClick={() => setOpen(true)}>
                    <Task
                      name={item.name}
                      dueDate={item.dueDate}
                      id={item.id}
                      index={index}
                    />
                  </div>
                </>
              ))}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
