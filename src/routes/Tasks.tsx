import React, { useEffect, useState } from 'react';
import { Container } from '../styles/globalPage.styles';
import Layout from '../layouts/Layout';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Overview from './TaskRoutes/Overview';
import { useProjectStore } from '@app/stores/projectStore';
import { supabase } from '@app/supabase';
import TaskNavBar from '@app/components/Navigation/TaskNavBar/TaskNavBar';
import TasksView from './TaskRoutes/TasksView';

export default function Tasks() {
  const getProjects = useProjectStore((state: any) => state.getProjects);
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  const projects = useProjectStore((state: any) => state.projects);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectData = async () => {
      const initialProjects = await getProjects();
      const projectId = searchParams.get('projectId');
      if (projectId) {
        const project = initialProjects.filter((project: any) => project.id == projectId);
        setSelectedProject(projectId, project[0].name);

        setLoading(false);
      } else {
        setSelectedProject(initialProjects[0].id, initialProjects[0].name);
        setLoading(false);
      }
    };
    getProjectData();
    if (location.pathname === '/projects') navigate('/projects/overview');
  }, []);

  const SubPage = () => {
    if (location.pathname === '/tasks') return <Overview />;
    if (location.pathname === '/tasks/overview') return <Overview />;
    if (location.pathname === '/tasks/today') return <TasksView />;
    if (location.pathname === '/tasks/upcoming') return <TasksView />;
    if (location.pathname === '/tasks/all') return <TasksView />;
    if (location.pathname === '/tasks/completed') return <TasksView />;
    if (location.pathname === '/tasks/personal') return <TasksView />;
    return <div>No Path</div>;
  };

  return (
    <Layout>
      <TaskNavBar />
      {!loading && (
        <Container>
          <SubPage />
        </Container>
      )}
    </Layout>
  );
}
