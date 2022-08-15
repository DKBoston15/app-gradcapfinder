import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import React, { useEffect, useState } from 'react';
import { KBarProvider } from 'kbar';
import KBar from '@app/layouts/KBar/KBar';
import { groupIndexMap } from '@app/constants';

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

export default function PrivateRoute({ children }: any) {
  const user = supabase.auth.user();
  const navigate = useNavigate();
  const actions = [
    {
      id: 'research',
      name: 'Research',
      shortcut: ['r'],
      keywords: 'research articles literature paradigms questions designs',
      section: 'Navigation',
      perform: () => navigate('/research'),
    },
    {
      id: 'analysis',
      name: 'Analysis',
      shortcut: ['a'],
      keywords: 'analysis samples techniques',
      section: 'Navigation',
      perform: () => navigate('/analysis'),
    },
    {
      id: 'professionalism',
      name: 'Professionalism',
      shortcut: ['p'],
      keywords: 'professionalism tables labs figures models',
      section: 'Navigation',
      perform: () => navigate('/professionalism'),
    },
    {
      id: 'writing',
      name: 'Writing',
      shortcut: ['w'],
      keywords: 'writing researchers people journals key terms',
      section: 'Navigation',
      perform: () => navigate('/writing'),
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
      id: 'knowledge_base',
      name: 'Knowledge Base',
      shortcut: ['l'],
      keywords: 'knowledge learn learning education knowledge details',
      section: 'Navigation',
      perform: () => navigate('/knowledge_base/overview'),
    },
    {
      id: 'knowledge-base-video-series',
      name: 'Video Series',
      shortcut: ['lvs'],
      keywords: 'knowledge learn learning education knowledge details video series',
      section: 'Knowledge Base',
      perform: () => navigate('/knowledge_base/video_series'),
    },
    {
      id: 'knowledge-base-research',
      name: 'Research',
      shortcut: ['lr'],
      keywords: 'knowledge learn learning education knowledge details research',
      section: 'Knowledge Base',
      perform: () => navigate('/knowledge_base/research'),
    },
    {
      id: 'knowledge-base-paradigms',
      name: 'Paradigms',
      shortcut: ['lrp'],
      keywords: 'knowledge learn learning education knowledge details research paradigms',
      section: 'Knowledge Base',
      perform: () => navigate('/knowledge_base/research_paradigms'),
    },
    {
      id: 'knowledge-base-questions',
      name: 'Questions',
      shortcut: ['lrq'],
      keywords: 'knowledge learn learning education knowledge details research questions',
      section: 'Knowledge Base',
      perform: () => navigate('/knowledge_base/research_questions'),
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

      for (const x of groupedItems) {
        const section = x.label == 'Samplings' ? 'Samples' : x.label;
        for (const i of x.items) {
          const navSection = i.type == 'samplings' ? 'sample' : i.type;
          let parentSection = '';
          if (
            navSection == 'literature' ||
            navSection == 'articles' ||
            navSection == 'research_paradigms' ||
            navSection == 'research_questions' ||
            navSection == 'analytic_designs'
          ) {
            parentSection = 'research';
          }
          if (
            navSection == 'analysis_techniques' ||
            navSection == 'samplings' ||
            navSection == 'samples' ||
            navSection == 'sample'
          ) {
            parentSection = 'analysis';
          }
          if (
            navSection == 'tables' ||
            navSection == 'figures' ||
            navSection == 'labs' ||
            navSection == 'models'
          ) {
            parentSection = 'professionalism';
          }
          if (navSection == 'people' || navSection == 'key_terms' || navSection == 'journals') {
            parentSection = 'writing';
          }
          newGroupActions.push({
            id: i.id,
            name: i.title,
            keywords: i.title,
            section,
            perform: () => navigate(`/${parentSection}/${navSection}/${i.id}`),
          });
        }
      }
      setNewActions([...newGroupActions]);
    };
    getData();
  }, []);

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
