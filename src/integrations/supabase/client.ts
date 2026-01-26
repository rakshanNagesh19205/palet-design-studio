import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://axlgpqeoxknwpwkfaklp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_CZLdif6Mwi2NlUIyrQqthg_watbwj5b';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
