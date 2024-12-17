import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ctmtsrafsysqouyzkqqq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bXRzcmFmc3lzcW91eXprcXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNTUyOTAsImV4cCI6MjA0OTczMTI5MH0.jk9sTW02mXEqhlMd_Y_ePOEQj18O7LkWOcGPSzgEecY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
