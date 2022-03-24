import React, { useState } from "react";
import {
  Container,
  Icon,
  NavList,
  NavLink,
  NavSidebar,
  Logout,
} from "./styles";
import { supabase } from "../../../supabase";
import { useNavigate } from "react-router-dom";

export default function MainNavBar() {
  const [visibleRight, setVisibleRight] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Container>
      <Icon
        className="pi pi-align-justify"
        onClick={() => setVisibleRight(true)}
      />
      <NavSidebar
        position="right"
        visible={visibleRight}
        onHide={() => setVisibleRight(false)}
      >
        <NavList>
          <NavLink to="/dashboard" onClick={() => setVisibleRight(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/tasks" onClick={() => setVisibleRight(false)}>
            Tasks
          </NavLink>
          <NavLink to="/projects" onClick={() => setVisibleRight(false)}>
            Projects
          </NavLink>
          <NavLink to="/people" onClick={() => setVisibleRight(false)}>
            People
          </NavLink>
          <NavLink to="/learn" onClick={() => setVisibleRight(false)}>
            Learn
          </NavLink>
          <NavLink to="/chat" onClick={() => setVisibleRight(false)}>
            Chat
          </NavLink>
          <NavLink to="/settings" onClick={() => setVisibleRight(false)}>
            Settings
          </NavLink>
          <Logout
            onClick={async () => {
              signOut();
            }}
          >
            Logout
          </Logout>
        </NavList>
      </NavSidebar>
    </Container>
  );
}
