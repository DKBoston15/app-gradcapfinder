import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useProfileStore } from '../../stores/profileStore';
import React, { useEffect, useState } from 'react';

export default function PrivateRoute({ children }: any) {
  const profile = useProfileStore((state: any) => state.profile);
  const [user, setUser] = useState({});
  useEffect(() => {
    const handleUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    handleUser();
  }, []);

  return user && profile.role === 0 ? children : <Navigate to="/dashboard" />;
}
