import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../styles/globalPage.styles';
import Overview from './LearnRoutes/Overview';
import LearnView from './LearnRoutes/LearnView';
import VideoSeries from './LearnRoutes/VideoSeries';

export default function Learn() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/knowledge_base') navigate('/knowledge_base/overview');
    setLoading(false);
  }, []);

  const menu = useRef(null);

  function SubPage() {
    if (location.pathname === '/knowledge_base') return <Overview />;
    if (location.pathname === '/knowledge_base/writing') return <LearnView />;
    if (location.pathname === '/knowledge_base/overview') return <Overview />;
    if (location.pathname === '/knowledge_base/video_series') return <VideoSeries />;
    if (location.pathname === '/knowledge_base/research') return <LearnView />;
    if (location.pathname === '/knowledge_base/analysis') return <LearnView />;
    if (location.pathname === '/knowledge_base/professionalism') return <LearnView />;
    if (location.pathname === '/knowledge_base/paradigms') return <LearnView />;
    if (location.pathname === '/knowledge_base/questions') return <LearnView />;
    if (location.pathname === '/knowledge_base/samples') return <LearnView />;
    if (location.pathname === '/knowledge_base/designs') return <LearnView />;
    if (location.pathname === '/knowledge_base/techniques') return <LearnView />;
    if (location.pathname === '/knowledge_base/models') return <LearnView />;
    if (location.pathname === '/knowledge_base/figures') return <LearnView />;
    if (location.pathname === '/knowledge_base/tables') return <LearnView />;
    if (location.pathname === '/knowledge_base/labs') return <LearnView />;
    if (location.pathname === '/knowledge_base/researchers') return <LearnView />;
    if (location.pathname === '/knowledge_base/key_terms') return <LearnView />;
    if (location.pathname === '/knowledge_base/articles') return <LearnView />;
    return <div>No Path</div>;
  }

  return (
    <>
      {!loading && (
        <Container>
          <SubPage />
        </Container>
      )}
    </>
  );
}
