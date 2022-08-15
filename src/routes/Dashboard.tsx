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
import { dashboardOnboardingSteps } from '@app/constants/onboardingSteps';

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
      <Steps
        enabled={onboarding}
        steps={dashboardOnboardingSteps}
        initialStep={0}
        onExit={onExit}
      />
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
            Check it on the main navigation bar to the left!
          </Paragraph>
        </IntroContainer>
      )}
    </Container>
  );
}
