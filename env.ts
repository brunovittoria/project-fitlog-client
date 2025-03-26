export const EnvVars = {
  SITE_NAME: 'FitLog',
  URL: process.env.NEXT_PUBLIC_DOMAIN_URL || '',
  API_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
  Environment: process.env.NEXT_PUBLIC_NODE_ENV || 'production',
};
