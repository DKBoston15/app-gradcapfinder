import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import React, { useState } from 'react';
import AvatarIcon from '@app/components/Profile/Avatar/AvatarIcon';
import { useGeneralStore } from '@app/stores/generalStore';
import NavigationLayout from '@app/layouts/NavigationLayout';
import { KBarProvider } from 'kbar';
import KBar from '@app/layouts/KBar/KBar';

export default function PrivateRoute({ children }: any) {
  const user = supabase.auth.user();
  const navigate = useNavigate();

  const actions = [
    {
      id: 'tasks',
      name: 'Tasks',
      shortcut: ['t'],
      keywords: 'task tasks',
      section: 'Navigation',
      perform: () => navigate('/tasks'),
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['p'],
      keywords: 'project projects',
      section: 'Navigation',
      perform: () => navigate('/projects'),
    },
    {
      id: 'learn',
      name: 'Learn',
      shortcut: ['l'],
      keywords: 'learn learning education knowledge details',
      section: 'Navigation',
      perform: () => navigate('/learn/overview'),
    },
  ];

  return user ? (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}>
      <KBar />
      <div style={{ background: '#f7f9ff' }}>
        {/*   */}
        {children}
      </div>
    </KBarProvider>
  ) : (
    <Navigate to="/" />
  );
}
