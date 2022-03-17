import { supabase } from '../../../supabase';

export default async function handler(req: any, res: any) {
  await supabase.auth.api.setAuthCookie(req, res);
}
