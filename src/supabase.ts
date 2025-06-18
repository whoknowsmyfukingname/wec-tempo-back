import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iusufimexqcwmizmtkdg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1c3VmaW1leHFjd21pem10a2RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTMzNzcsImV4cCI6MjA2NDc4OTM3N30.44gpCk9nMN2Fs75KAHlZSceCZyhe9b1G7055QRLPuSQ';

const supabase = createClient(supabaseUrl, supabaseKey, { db: { schema: 'public' } });

export default supabase;