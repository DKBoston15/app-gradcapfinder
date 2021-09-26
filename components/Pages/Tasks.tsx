import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase";
import { db } from "../../firebase";
import Header from "../TaskComponents/Header";
import Content from "../TaskComponents/Content";
import { ProjectsProvider, SelectedProjectProvider } from "../../context";

export default function Tasks() {
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className="bg-primary flex flex-col w-full min-h-screen">
          <Header />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}
