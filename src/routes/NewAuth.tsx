import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@app/supabase';

import React from 'react';

export default function NewAuth() {
  return <Auth supabaseClient={supabase} />;
}
