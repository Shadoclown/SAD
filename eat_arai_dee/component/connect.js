
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and API key
const SUPABASE_URL = 'https://plzmpmboksgtbfkidtkr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsem1wbWJva3NndGJma2lkdGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NjcwMDMsImV4cCI6MjA2MTE0MzAwM30.avxPpffBFpYYEQBnkbSDmWYTVmCu1veggDUQMDve6oo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;