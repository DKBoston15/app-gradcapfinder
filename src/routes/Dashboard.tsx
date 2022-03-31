import { useEffect, useState } from 'react';
import { Container } from '../styles/globalPage.styles';
import Layout from '../layouts/Layout';
import { supabase } from '../supabase/index';
import { useProfileStore } from '../stores/profileStore';

export default function Dashboard() {
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
          <Container>Dashboard</Container>
        </Layout>
      )}
    </div>
  );
}
