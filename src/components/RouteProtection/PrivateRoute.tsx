import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import React, { useEffect, useState } from 'react';
import { KBarProvider } from 'kbar';
import KBar from '@app/layouts/KBar/KBar';
import { groupIndexMap } from '@app/constants';

export default function PrivateRoute({ children }: any) {
  const user = supabase.auth.user();
  const navigate = useNavigate();
  const actions = [
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['p'],
      keywords: 'project projects',
      section: 'Navigation',
      perform: () => navigate('/projects'),
    },
    {
      id: 'tasks',
      name: 'Tasks',
      shortcut: ['t'],
      keywords: 'task tasks',
      section: 'Navigation',
      perform: () => navigate('/tasks'),
    },
    {
      id: 'metrics',
      name: 'Metrics',
      shortcut: ['m'],
      keywords: 'metric metrics',
      section: 'Navigation',
      perform: () => navigate('/tasks/metrics'),
    },
    {
      id: 'checklists',
      name: 'Checklists',
      shortcut: ['c'],
      keywords: 'checklist checlists',
      section: 'Navigation',
      perform: () => navigate('/checklists'),
    },
    {
      id: 'learn',
      name: 'Learn',
      shortcut: ['l'],
      keywords: 'learn learning education knowledge details',
      section: 'Navigation',
      perform: () => navigate('/learn/overview'),
    },
    {
      id: 'learn-video-series',
      name: 'Video Series',
      shortcut: ['lvs'],
      keywords: 'learn learning education knowledge details video series',
      section: 'Learn',
      perform: () => navigate('/learn/video_series'),
    },
    {
      id: 'learn-research',
      name: 'Research',
      shortcut: ['lr'],
      keywords: 'learn learning education knowledge details research',
      section: 'Learn',
      perform: () => navigate('/learn/research'),
    },
    {
      id: 'learn-paradigms',
      name: 'Paradigms',
      shortcut: ['lrp'],
      keywords: 'learn learning education knowledge details research paradigms',
      section: 'Learn',
      perform: () => navigate('/learn/research_paradigms'),
    },
    {
      id: 'learn-questions',
      name: 'Questions',
      shortcut: ['lrq'],
      keywords: 'learn learning education knowledge details research questions',
      section: 'Learn',
      perform: () => navigate('/learn/research_questions'),
    },
  ];

  const [newActions, setNewActions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const groupedItems = [
        {
          label: 'Literature',
          items: [],
        },
        {
          label: 'Paradigms',
          items: [],
        },
        {
          label: 'Questions',
          items: [],
        },
        {
          label: 'Samplings',
          items: [],
        },
        {
          label: 'Designs',
          items: [],
        },
        {
          label: 'Techniques',
          items: [],
        },
        {
          label: 'Grants',
          items: [],
        },
        {
          label: 'Figures',
          items: [],
        },
        {
          label: 'Tables',
          items: [],
        },
        {
          label: 'Labs',
          items: [],
        },
        {
          label: 'Models',
          items: [],
        },
        {
          label: 'People',
          items: [],
        },
        {
          label: 'Key Terms',
          items: [],
        },
        {
          label: 'Journals',
          items: [],
        },
      ];
      const { data } = await supabase.rpc('all_items', { user_id: user?.id });
      data?.forEach((item) => {
        groupedItems[groupIndexMap[item.type]].items.push(item);
      });
      const newGroupActions = [];

      for (let x = 0; x < groupedItems.length; x++) {
        for (let i = 0; i < groupedItems[x].items.length; i++) {
          const navSection =
            groupedItems[x].items[i].type == 'samplings' ? 'sample' : groupedItems[x].items[i].type;
          const section = groupedItems[x].label == 'Samplings' ? 'Samples' : groupedItems[x].label;
          newGroupActions.push({
            id: groupedItems[x].items[i].id,
            name: groupedItems[x].items[i].title,
            keywords: groupedItems[x].items[i].title,
            section: section,
            perform: () =>
              navigate(
                `/projects/${groupedItems[x].items[i].project_id}/${navSection}/${groupedItems[x].items[i].id}`,
              ),
          });
        }
      }

      setNewActions([...newGroupActions]);
    };
    getData();
  }, []);

  function addPropsToReactElement(element, props) {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, props);
    }
    return element;
  }

  function addPropsToChildren(childrenWithProps, props) {
    if (!Array.isArray(childrenWithProps)) {
      return addPropsToReactElement(childrenWithProps, props);
    }
    return childrenWithProps.map((childElement) => addPropsToReactElement(childElement, props));
  }

  return user ? (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}>
      <KBar />
      <div style={{ background: '#f7f9ff' }}>
        {newActions.length > 0 && <div>{addPropsToChildren(children, { newActions })}</div>}
      </div>
    </KBarProvider>
  ) : (
    <Navigate to="/" />
  );
}
