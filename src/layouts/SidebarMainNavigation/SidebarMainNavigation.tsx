import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import { useKBar } from 'kbar';
import { useGeneralStore } from '@app/stores/generalStore';

export default function SidebarMainNavigation() {
  const { query } = useKBar();
  const navigate = useNavigate();
  const setNavVisible = useGeneralStore((state: any) => state.setNavVisible);
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => {
        navigate('/tasks');
      },
    },
    {
      label: 'Search',
      icon: 'pi pi-fw pi-search',
      command: () => {
        query.toggle();
      },
    },
    {
      label: 'Tasks',
      icon: 'pi pi-fw pi-check-square',
      command: () => {
        navigate('/tasks');
      },
    },
    {
      label: 'Projects',
      icon: 'pi pi-fw pi-folder-open',
      items: [
        {
          label: 'Overview',
          command: () => {
            navigate('/projects');
          },
        },
        {
          label: 'Research',
          items: [
            {
              label: 'Literature',
              command: () => {
                navigate('/projects/literature');
              },
            },
            {
              label: 'Paradigms',
              command: () => {
                navigate('/projects/research_paradigms');
              },
            },
            {
              label: 'Questions',
              command: () => {
                navigate('/projects/research_questions');
              },
            },
          ],
        },
        {
          label: 'Analysis',
          items: [
            {
              label: 'Sampling',
              command: () => {
                navigate('/projects/sampling');
              },
            },
            {
              label: 'Designs',
              command: () => {
                navigate('/projects/analytic_designs');
              },
            },
            {
              label: 'Techniques',
              command: () => {
                navigate('/projects/analysis_techniques');
              },
            },
          ],
        },
        {
          label: 'Professionalism',
          items: [
            {
              label: 'Grants',
              command: () => {
                navigate('/projects/grants');
              },
            },
            {
              label: 'Figures',
              command: () => {
                navigate('/projects/figures');
              },
            },
            {
              label: 'Tables',
              command: () => {
                navigate('/projects/tables');
              },
            },
            {
              label: 'Labs',
              command: () => {
                navigate('/projects/labs');
              },
            },
            {
              label: 'Models',
              command: () => {
                navigate('/projects/models');
              },
            },
          ],
        },
        {
          label: 'Writing',
          items: [
            {
              label: 'People',
              command: () => {
                navigate('/projects/people');
              },
            },
            {
              label: 'Key Terms',
              command: () => {
                navigate('/projects/key_terms');
              },
            },
            {
              label: 'Journals',
              command: () => {
                navigate('/projects/journals');
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Learn',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Overview',
          command: () => {
            navigate('/learn/overview');
          },
        },
        {
          label: 'Video Series',
          command: () => {
            navigate('/learn/video_series');
          },
        },
        {
          label: 'Research',
          items: [
            {
              label: 'Overview',
              command: () => {
                navigate('/learn/research');
              },
            },
            {
              label: 'Paradigms',
              command: () => {
                navigate('/learn/research_paradigms');
              },
            },
            {
              label: 'Questions',
              command: () => {
                navigate('/learn/research_questions');
              },
            },
          ],
        },
        {
          label: 'Analysis',
          items: [
            {
              label: 'Overview',
              command: () => {
                navigate('/learn/analysis');
              },
            },
            {
              label: 'Designs',
              command: () => {
                navigate('/learn/analysis_designs');
              },
            },
            {
              label: 'Techniques',
              command: () => {
                navigate('/learn/analysis_techniques');
              },
            },
            {
              label: 'Empirical Models',
              command: () => {
                navigate('/learn/empirical_models');
              },
            },
            {
              label: 'Sampling',
              command: () => {
                navigate('/learn/sampling');
              },
            },
          ],
        },
        {
          label: 'Professionalism',
          items: [
            {
              label: 'Overview',
              command: () => {
                navigate('/learn/professionalism');
              },
            },
            {
              label: 'Figures',
              command: () => {
                navigate('/learn/figures');
              },
            },
            {
              label: 'Tables',
              command: () => {
                navigate('/learn/tables');
              },
            },
            {
              label: 'Theoretical Models',
              command: () => {
                navigate('/learn/theoretical_models');
              },
            },
          ],
        },
        {
          label: 'Writing',
          items: [
            {
              label: 'Overview',
              command: () => {
                navigate('/learn/writing');
              },
            },
            {
              label: 'Authors',
              command: () => {
                navigate('/learn/authors');
              },
            },
            {
              label: 'Conceptual Models',
              command: () => {
                navigate('/learn/conceptual_models');
              },
            },
            {
              label: 'Key Terms',
              command: () => {
                navigate('/learn/key_terms');
              },
            },
            {
              label: 'Journals',
              command: () => {
                navigate('/learn/journals');
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Checklists',
      icon: 'pi pi-fw pi-list',
      command: () => {
        navigate('/checklist');
      },
    },
  ];

  return (
    <div>
      <div onClick={() => setNavVisible(false)}>X</div>
      <PanelMenu model={items} style={{ width: '100%' }} id="navPanel" multiple={true} />
    </div>
  );
}
