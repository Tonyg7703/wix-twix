export const CLIENT_ENV_MAP = {
  siteId: 'WIX_SITE_ID',
  accountId: 'WIX_ACCOUNT_ID',
  apiKey: 'WIX_API_KEY',
  clientId: 'WIX_CLIENT_ID',
} satisfies {
  [name: string]: keyof WixEnvMap;
};
