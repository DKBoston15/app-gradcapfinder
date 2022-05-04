import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import React from 'react';

export default function PrivateRoute({ children }: any) {
  const user = supabase.auth.user();
  return user ? children : <Navigate to="/" />;
}
