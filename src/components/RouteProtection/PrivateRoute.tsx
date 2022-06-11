import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import React, { useState } from 'react';
import AvatarIcon from '@app/components/Profile/Avatar/AvatarIcon';
import { useGeneralStore } from '@app/stores/generalStore';

export default function PrivateRoute({ children }: any) {
  const user = supabase.auth.user();

  return user ? (
    <div>
      <AvatarIcon absolute={true} />
      {children}
    </div>
  ) : (
    <Navigate to="/" />
  );
}
