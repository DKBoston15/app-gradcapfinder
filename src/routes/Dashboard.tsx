import React, { useEffect, useState } from 'react';
import {
  Container,
  IntroContainer,
  ButtonContainer,
  Title,
  Paragraph,
  CustomButton,
} from './styles/dashboard.styles';
import Layout from '../layouts/Layout';
import { supabase } from '../supabase/index';
import { useProfileStore } from '../stores/profileStore';
import { useNavigate } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import { useGeneralStore } from '@app/stores/generalStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const user = supabase.auth.user();
  const [loading, setLoading] = useState(false);
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);

  useEffect(() => {
    const getData = async () => {
      await getProfile(user?.id);
      setLoading(false);
    };
    getData();
  }, []);

  const steps = [
    {
      element: '.avatarIcon',
      intro:
        'You can access your profile by clicking here! You can upload an image, and keep track of various statuses.',
      position: 'left',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.notificationIcon',
      intro: `These are your notifications. When you have a new one, a small red dot will appear letting you know we've got something new to share with you!`,
      position: 'left',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.tasksIcon',
      intro: 'This takes you to task management!',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.projectsIcon',
      intro: 'This takes you to your projects!',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.learnIcon',
      intro: 'This takes you to our ever expanding library of resources for you!',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.onboardingIcon',
      intro:
        'If you ever want to restart this tutorial on any page, just click this icon to get a refresher!',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
  ];

  const onExit = () => {
    setOnboarding(false);
  };

  return (
    <div>
      <Steps enabled={onboarding} steps={steps} initialStep={0} onExit={onExit} />
      {loading ? (
        <p>Loading</p>
      ) : (
        <Layout>
          <Container>
            <IntroContainer>
              <Title className="title">Welcome to Quester</Title>
              <Paragraph>
                This page and the app as a whole is under development! <br />
                <br />
                Please bear with us as we continue to add features in the coming weeks. The Task and
                Project management in Quester is ready for you. <br />
                <br />
                Check it out below or on the main navigation bar to the left!
              </Paragraph>
              <ButtonContainer>
                <CustomButton onClick={() => navigate('/tasks')}>Tasks</CustomButton>
                <CustomButton onClick={() => navigate('/projects')}>Projects</CustomButton>
              </ButtonContainer>
            </IntroContainer>
          </Container>
        </Layout>
      )}
    </div>
  );
}
