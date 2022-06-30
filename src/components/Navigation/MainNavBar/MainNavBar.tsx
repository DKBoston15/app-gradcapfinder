import { Link } from 'react-router-dom';
import {
  Container,
  Icon,
  LinkContainer,
  Button,
  ImageContainer,
  OnboardingContainer,
} from './styles';
import { supabase } from '../../../supabase';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useProfileStore } from '../../../stores/profileStore';
import React, { useEffect, useState } from 'react';
import { useGeneralStore } from '@app/stores/generalStore';
import { Tooltip } from 'primereact/tooltip';

export default function MainNavBar() {
  const profile = useProfileStore((state: any) => state.profile);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const { projectId, id } = useParams();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    if (
      location.pathname === '/dashboard' ||
      location.pathname === '/tasks' ||
      (location.pathname.includes('literature') && location.pathname.length >= 40)
    ) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [location]);

  return (
    <>
      {profile && (
        <Container>
          <ImageContainer>
            <Link to="/dashboard">
              <img src="/nav_logo.png" width="100%" height="100%" />
            </Link>
          </ImageContainer>
          <LinkContainer>
            {/* <Link to="/dashboard">
              <Icon className="pi pi-th-large" />
            </Link> */}
            <Link to="/tasks" className="tasksIcon">
              <Icon className="pi pi-check-square" />
            </Link>
            <Tooltip
              target=".tasksIcon"
              content={`Tasks`}
              position="right"
              style={{ fontSize: '18px' }}
            />
            <Link to="/projects" className="projectsIcon">
              <Icon className="pi pi-folder-open" />
            </Link>
            <Tooltip
              target=".projectsIcon"
              content={`Projects`}
              position="right"
              style={{ fontSize: '18px' }}
            />
            <Link to="/learn" className="learnIcon">
              <Icon className="pi pi-book" />
            </Link>
            <Tooltip
              target=".learnIcon"
              content={`Learn`}
              position="right"
              style={{ fontSize: '18px' }}
            />
            <Link to="/newlayout" className="newlayout">
              <Icon className="pi pi-clock" />
            </Link>
            {/* <Link to="/checklist">
              <Icon className="pi pi-home" />
            </Link> */}
            {/* <Link to="/chat">
              <Icon className="pi pi-comments" />
            </Link> */}
            {/* <Link to="/settings">
              <Icon className="pi pi-cog" />
            </Link> */}
            {/* {profile.role === 0 && (
              <Link to="/admin">
                <Icon className="pi pi-server" />
              </Link>
            )} */}
          </LinkContainer>
          {showOnboarding && (
            <OnboardingContainer onClick={() => setOnboarding(true)}>
              <Tooltip
                target=".onboardingIcon"
                content={`Start Tutorial`}
                position="right"
                style={{ fontSize: '18px' }}
              />
              <Icon className="pi pi-info-circle onboardingIcon" />
            </OnboardingContainer>
          )}
          <Button
            onClick={async () => {
              sessionStorage.setItem('quester_login', 'false');
              signOut();
            }}>
            Logout
          </Button>
        </Container>
      )}
    </>
  );
}
