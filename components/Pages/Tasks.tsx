import React, { useState } from "react";
import Col from "../task-components/Col";
import { DragDropContext } from "react-beautiful-dnd";
interface IDragEnd {
  destination: {
    droppableId: string;
    index: number;
  };
  source: {
    droppableId: string;
    index: number;
  };
}

export default function Tasks() {
  const [backlogItems, setBacklogItems] = useState([
    { name: "Backlog Item", dueDate: "Aug 14, 2021", id: 1 },
  ]);
  const [wipItems, setWipItems] = useState([
    { name: "Work In Progress Item", dueDate: "Aug 14, 2021", id: 2 },
  ]);
  const [inReviewItems, setInReviewItems] = useState([
    { name: "In Review Item", dueDate: "Aug 14, 2021", id: 3 },
  ]);
  const [completedItems, setCompletedItems] = useState([
    { name: "Completed Item", dueDate: "Aug 14, 2021", id: 4 },
  ]);

  const handleDragEnd = ({ destination, source }: IDragEnd) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId === "backlog") {
        const arrCopy = [...backlogItems];
        const newCopy = [...backlogItems];
        newCopy[source.index] = arrCopy[destination.index];
        newCopy[destination.index] = arrCopy[source.index];
        setBacklogItems(newCopy);
      }
      if (destination.droppableId === "workinprogress") {
        const arrCopy = [...wipItems];
        const newCopy = [...wipItems];
        newCopy[source.index] = arrCopy[destination.index];
        newCopy[destination.index] = arrCopy[source.index];
        setWipItems(newCopy);
      }
      if (destination.droppableId === "inreview") {
        const arrCopy = [...inReviewItems];
        const newCopy = [...inReviewItems];
        newCopy[source.index] = arrCopy[destination.index];
        newCopy[destination.index] = arrCopy[source.index];
        setInReviewItems(newCopy);
      }
      if (destination.droppableId === "completed") {
        const arrCopy = [...completedItems];
        const newCopy = [...completedItems];
        newCopy[source.index] = arrCopy[destination.index];
        newCopy[destination.index] = arrCopy[source.index];
        setCompletedItems(newCopy);
      }
      return;
    }

    if (source.droppableId === "backlog") {
      const itemCopy = { ...backlogItems[source.index] };
      //Remove Item
      const newArr = backlogItems.filter(
        (backlog) => backlog.id != itemCopy.id
      );
      setBacklogItems(newArr);

      //Add Item
      if (destination.droppableId === "backlog") {
        backlogItems.splice(destination.index, 0, itemCopy);
        setBacklogItems(backlogItems);
      }
      if (destination.droppableId === "workinprogress") {
        wipItems.splice(destination.index, 0, itemCopy);
        setWipItems(wipItems);
      }
      if (destination.droppableId === "inreview") {
        inReviewItems.splice(destination.index, 0, itemCopy);
        setInReviewItems(inReviewItems);
      }
      if (destination.droppableId === "completed") {
        completedItems.splice(destination.index, 0, itemCopy);
        setCompletedItems(completedItems);
      }
    }
    if (source.droppableId === "workinprogress") {
      const itemCopy = { ...wipItems[source.index] };
      //Remove Item
      const newArr = wipItems.filter((wipItem) => wipItem.id != itemCopy.id);
      setWipItems(newArr);

      //Add Item
      if (destination.droppableId === "backlog") {
        backlogItems.splice(destination.index, 0, itemCopy);
        setBacklogItems(backlogItems);
      }
      if (destination.droppableId === "workinprogress") {
        wipItems.splice(destination.index, 0, itemCopy);
        setWipItems(wipItems);
      }
      if (destination.droppableId === "inreview") {
        inReviewItems.splice(destination.index, 0, itemCopy);
        setInReviewItems(inReviewItems);
      }
      if (destination.droppableId === "completed") {
        completedItems.splice(destination.index, 0, itemCopy);
        setCompletedItems(completedItems);
      }
    }
    if (source.droppableId === "inreview") {
      const itemCopy = { ...inReviewItems[source.index] };
      //Remove Item
      const newArr = inReviewItems.filter(
        (inReviewItem) => inReviewItem.id != itemCopy.id
      );
      setInReviewItems(newArr);

      //Add Item
      if (destination.droppableId === "backlog") {
        backlogItems.splice(destination.index, 0, itemCopy);
        setBacklogItems(backlogItems);
      }
      if (destination.droppableId === "workinprogress") {
        wipItems.splice(destination.index, 0, itemCopy);
        setWipItems(wipItems);
      }
      if (destination.droppableId === "inreview") {
        inReviewItems.splice(destination.index, 0, itemCopy);
        setInReviewItems(inReviewItems);
      }
      if (destination.droppableId === "completed") {
        completedItems.splice(destination.index, 0, itemCopy);
        setCompletedItems(completedItems);
      }
    }
    if (source.droppableId === "completed") {
      const itemCopy = { ...completedItems[source.index] };
      //Remove Item
      const newArr = completedItems.filter(
        (completedItem) => completedItem.id != itemCopy.id
      );
      setCompletedItems(newArr);

      //Add Item
      if (destination.droppableId === "backlog") {
        backlogItems.splice(destination.index, 0, itemCopy);
        setBacklogItems(backlogItems);
      }
      if (destination.droppableId === "workinprogress") {
        wipItems.splice(destination.index, 0, itemCopy);
        setWipItems(wipItems);
      }
      if (destination.droppableId === "inreview") {
        inReviewItems.splice(destination.index, 0, itemCopy);
        setInReviewItems(inReviewItems);
      }
      if (destination.droppableId === "completed") {
        completedItems.splice(destination.index, 0, itemCopy);
        setCompletedItems(completedItems);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-full p-24">
      <div className="text-4xl font-semibold mb-4">My Tasks</div>
      <div className="flex w-full justify-between min-h-full space-x-6">
        {/* @ts-ignore */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Col title="Backlog" items={backlogItems} />
          <Col title="Work In Progress" items={wipItems} />
          <Col title="In Review" items={inReviewItems} />
          <Col title="Completed" items={completedItems} />
        </DragDropContext>
      </div>
    </div>
  );
}
