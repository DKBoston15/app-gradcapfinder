import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useProfileStore } from '../../stores/profileStore';

export default function PrivateRoute({ children }: any) {
  const profile = useProfileStore((state: any) => state.profile);
  const user = supabase.auth.user();

  return user && profile.role === 0 ? children : <Navigate to="/dashboard" />;
}
