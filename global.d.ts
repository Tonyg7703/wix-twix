type WixEnvMap = {
  WIX_SITE_ID: 'WIX_SITE_ID';
  WIX_ACCOUNT_ID: 'WIX_ACCOUNT_ID';
  WIX_API_KEY: 'WIX_API_KEY';
  WIX_CLIENT_ID: 'WIX_CLIENT_ID';
};

type WixEnv = EnumToObject<WixEnvMap>;
type EnumToObject<T extends Record<string, string>> = {
  [K in keyof T]: string;
};

declare namespace NodeJS {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface ProcessEnv extends WixEnv {}
}
