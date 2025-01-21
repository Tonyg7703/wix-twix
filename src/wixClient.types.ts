import type {
  Descriptors,
  IApiKeyStrategy,
  IOAuthStrategy,
  WixClient,
} from '@wix/sdk';
import type { CLIENT_ENV_MAP } from './wixClient.constants';

export type ServerClientEnv = {
  [K in keyof Pick<
    typeof CLIENT_ENV_MAP,
    'siteId' | 'accountId' | 'apiKey'
  >]: string;
};

export type WebClientEnv = {
  [K in keyof Pick<typeof CLIENT_ENV_MAP, 'clientId'>]: string;
};

export type ClientEnvName<E> = keyof E extends keyof typeof CLIENT_ENV_MAP
  ? keyof E
  : never;

export type ClientEnv = ServerClientEnv | WebClientEnv;
export type AuthStrategy = IOAuthStrategy | IApiKeyStrategy;
export type Modules = Descriptors;
export type Client<M extends Modules, A extends AuthStrategy> = WixClient<
  undefined,
  A,
  M
>;

export type ClientProps<M extends Modules> = {
  modules?: M;
};
