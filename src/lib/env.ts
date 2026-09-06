function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  lineChannelSecret: required('LINE_CHANNEL_SECRET'),
  lineAccessToken: required('LINE_CHANNEL_ACCESS_TOKEN'),
  supabaseUrl: required('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseServiceKey: required('SUPABASE_SERVICE_ROLE_KEY'),
} as const;