import React, { useEffect, useState } from 'react';
import {
  Container,
  IntroContainer,
  ButtonContainer,
  Title,
  Paragraph,
  CustomButton,
} from './styles/dashboard.styles';
import { supabase } from '../supabase/index';
import { useNavigate } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import { useGeneralStore } from '@app/stores/generalStore';

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
    element: '.feedbackContainer',
    intro:
      'We are working hard to make this the best experience for you! We rely on and want your feedback, whether it is a bug, a new feature, or just a comment, let us know!',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.onboardingIcon',
    intro:
      'If you see this icon on any page in the app, you can click it to get a tutorial of the page you are on.',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = supabase.auth.user();
  const [loading, setLoading] = useState(false);
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onExit = () => {
    setOnboarding(false);
  };

  return (
    <Container>
      <Steps enabled={onboarding} steps={steps} initialStep={0} onExit={onExit} />
      {loading ? (
        <p>Loading</p>
      ) : (
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
      )}
    </Container>
  );
}
