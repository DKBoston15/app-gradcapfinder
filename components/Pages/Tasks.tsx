import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase";
import { db } from "../../firebase";
import Header from "../TaskComponents/Header";
import Content from "../TaskComponents/Content";

export default function Tasks() {
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <div className="min-w-screen min-h-screen">
      <Header />
      <Content />
    </div>
  );
}
