import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import React, { useState } from 'react';
import AvatarIcon from '@app/components/Profile/Avatar/AvatarIcon';
import { useGeneralStore } from '@app/stores/generalStore';
import NavigationLayout from '@app/layouts/NavigationLayout';

export default function PrivateRoute({ children }: any) {
  const user = supabase.auth.user();

  return user ? (
    <div>
      {/*   */}
      {children}
    </div>
  ) : (
    <Navigate to="/" />
  );
}
