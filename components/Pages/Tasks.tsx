import React, { useState, useEffect } from "react";
import Col from "../task-components/Col";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase";
import { db } from "../../firebase";

export default function Tasks() {
  const [user, loading, error] = useAuthState(firebase.auth());

  return <div className="flex min-h-screen flex-col w-full p-24"></div>;
}
