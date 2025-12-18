import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hdxviiuhrsvnajzuezzc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeHZpaXVocnN2bmFqenVlenpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNTg0MjcsImV4cCI6MjA4MTYzNDQyN30.WGW_7wyTmjl6lQfseAaLZjlVDERQPDTOgXQjL0oiUPw';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
