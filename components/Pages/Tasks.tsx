import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase";
import { db } from "../../firebase";
import Content from "../TaskComponents/Content";

export default function Tasks() {
  const [user, loading, error] = useAuthState(firebase.auth());
  return (
    <div className="flex flex-col w-full min-h-screen">{/* <Content /> */}</div>
  );
}
