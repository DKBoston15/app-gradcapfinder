import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container } from '../styles/globalPage.styles';
import Overview from './LearnRoutes/Overview';
import LearnView from './LearnRoutes/LearnView';
import VideoSeries from './LearnRoutes/VideoSeries';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

export default function Learn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/learn') navigate('/learn/overview');
    setLoading(false);
  }, []);

  const menu = useRef(null);

  function SubPage() {
    if (location.pathname === '/learn') return <Overview />;
    if (location.pathname === '/learn/writing') return <LearnView />;
    if (location.pathname === '/learn/overview') return <Overview />;
    if (location.pathname === '/learn/video_series') return <VideoSeries />;
    if (location.pathname === '/learn/research') return <LearnView />;
    if (location.pathname === '/learn/analysis') return <LearnView />;
    if (location.pathname === '/learn/professionalism') return <LearnView />;
    if (location.pathname === '/learn/research_paradigms') return <LearnView />;
    if (location.pathname === '/learn/research_questions') return <LearnView />;
    if (location.pathname === '/learn/samples') return <LearnView />;
    if (location.pathname === '/learn/analysis_designs') return <LearnView />;
    if (location.pathname === '/learn/analysis_techniques') return <LearnView />;
    if (location.pathname === '/learn/empirical_models') return <LearnView />;
    if (location.pathname === '/learn/figures') return <LearnView />;
    if (location.pathname === '/learn/tables') return <LearnView />;
    if (location.pathname === '/learn/theoretical_models') return <LearnView />;
    if (location.pathname === '/learn/authors') return <LearnView />;
    if (location.pathname === '/learn/conceptual_models') return <LearnView />;
    if (location.pathname === '/learn/key_terms') return <LearnView />;
    if (location.pathname === '/learn/journals') return <LearnView />;
    return <div>No Path</div>;
  }

  const menuItems = [
    {
      label: 'Overview',
      command: () => {
        navigate(`/learn/overview`);
      },
    },
    {
      label: 'Video Series',
      command: () => {
        navigate(`/learn/video_series`);
      },
    },
    {
      label: 'Research',
      items: [
        {
          label: 'Research',
          command: () => {
            navigate(`/learn/research`);
          },
        },
        {
          label: 'Paradigms',
          command: () => {
            navigate(`/learn/research_paradigms`);
          },
        },
        {
          label: 'Questions',
          command: () => {
            navigate(`/learn/research_questions`);
          },
        },
      ],
    },
    // {
    //   label: 'Analysis',
    //   items: [
    //     {
    //       label: 'Sampling',
    //       command: () => {
    //         navigate(`/projects/${projectId}/sampling`);
    //       },
    //     },
    //     {
    //       label: 'Designs',
    //       command: () => {
    //         navigate(`/projects/${projectId}/analytic_designs`);
    //       },
    //     },
    //     {
    //       label: 'Techniques',
    //       command: () => {
    //         navigate(`/projects/${projectId}/analysis_techniques`);
    //       },
    //     },
    //   ],
    // },
    // {
    //   label: 'Professionalism',
    //   items: [
    //     {
    //       label: 'Grants',
    //       command: () => {
    //         navigate(`/projects/${projectId}/grants`);
    //       },
    //     },
    //     {
    //       label: 'Figures',
    //       command: () => {
    //         navigate(`/projects/${projectId}/figures`);
    //       },
    //     },
    //     {
    //       label: 'Tables',
    //       command: () => {
    //         navigate(`/projects/${projectId}/tables`);
    //       },
    //     },
    //     {
    //       label: 'Labs',
    //       command: () => {
    //         navigate(`/projects/${projectId}/labs`);
    //       },
    //     },
    //     {
    //       label: 'Models',
    //       command: () => {
    //         navigate(`/projects/${projectId}/models`);
    //       },
    //     },
    //   ],
    // },
    // {
    //   label: 'Writing',
    //   items: [
    //     {
    //       label: 'People',
    //       command: () => {
    //         navigate(`/projects/${projectId}/people`);
    //       },
    //     },
    //     {
    //       label: 'Key Terms',
    //       command: () => {
    //         navigate(`/projects/${projectId}/key_terms`);
    //       },
    //     },
    //     {
    //       label: 'Journals',
    //       command: () => {
    //         navigate(`/projects/${projectId}/journals`);
    //       },
    //     },
    //   ],
    // },
  ];

  return (
    <>
      {!loading && (
        <Container>
          <Menu model={menuItems} popup ref={menu} id="popup_menu" />
          <Button
            label="Menu"
            className="p-button-sm"
            style={{ marginRight: '1rem' }}
            icon="pi pi-bars"
            onClick={(event) => menu.current.toggle(event)}
            aria-controls="popup_menu"
            aria-haspopup
          />
          <SubPage />
        </Container>
      )}
    </>
  );
}
