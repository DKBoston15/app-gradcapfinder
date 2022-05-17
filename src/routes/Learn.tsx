import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import LearnNavBar from '@app/components/Navigation/LearnNavBar/LearnNavBar';
import LearnBottomMobileNavBar from '@app/components/Navigation/LearnBottomMobileNavBar/LearnBottomMobileNavBar';
import { Container } from '../styles/globalPage.styles';
import Layout from '../layouts/Layout';
import Overview from './LearnRoutes/Overview';
import LearnView from './LearnRoutes/LearnView';

export default function Learn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/learn') navigate('/learn/overview');
    setLoading(false);
  }, []);

  function SubPage() {
    if (location.pathname === '/learn') return <Overview />;
    if (location.pathname === '/learn/overview') return <Overview />;
    if (location.pathname === '/learn/research_paradigms') return <LearnView />;
    if (location.pathname === '/learn/research_questions') return <LearnView />;
    if (location.pathname === '/learn/sampling') return <LearnView />;
    if (location.pathname === '/learn/analysis_designs') return <LearnView />;
    if (location.pathname === '/learn/analysis_techniques') return <LearnView />;
    if (location.pathname === '/learn/empirical_model') return <LearnView />;
    if (location.pathname === '/learn/figures') return <LearnView />;
    if (location.pathname === '/learn/tables') return <LearnView />;
    if (location.pathname === '/learn/theoretical_models') return <LearnView />;
    if (location.pathname === '/learn/authors') return <LearnView />;
    if (location.pathname === '/learn/conceptual_models') return <LearnView />;
    if (location.pathname === '/learn/key_terms') return <LearnView />;
    if (location.pathname === '/learn/journals') return <LearnView />;
    return <div>No Path</div>;
  }

  return (
    <Layout>
      <LearnNavBar />
      <LearnBottomMobileNavBar />
      {!loading && (
        <Container>
          <SubPage />
        </Container>
      )}
    </Layout>
  );
}
