import { useEffect, useState } from 'react';
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

export default function Dashboard() {
  const navigate = useNavigate();
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const user = supabase.auth.user();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await getProfile(user?.id);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Layout>
          <Container>
            <IntroContainer>
              <Title>Welcome to Quester</Title>
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
