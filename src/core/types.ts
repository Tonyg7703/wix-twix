/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  WixClient as Client,
  Descriptors,
  Tokens,
  IApiKeyStrategy,
  IOAuthStrategy,
} from '@wix/sdk';

export type WixModules = Descriptors;

export type WixClient<M extends WixModules = object> =
  | WixWebClient<M>
  | WixAdminClient<M>;

export type WixWebClient<M extends WixModules = object> = Client<
  undefined,
  IOAuthStrategy,
  M
>;

export type WixAdminClient<T extends WixModules = object> = Client<
  undefined,
  IApiKeyStrategy,
  T
>;

type TwixAction<C extends WixClient> = (
  this: TwixBase<C>,
  ...args: any[]
) => unknown | Promise<unknown>;

export type TwixBase<C extends WixClient> = { client: C };
export type TwixActions<C extends WixClient> = Record<string, TwixAction<C>>;

export type TwixWebAuth = {
  clientId: string;
  tokens?: Tokens;
};

export type TwixAdminAuth = {
  apiKey: string;
  siteId: string;
  accountId?: string;
};

export type TwixProps<Auth, Modules, Actions> = {
  auth: Auth;
  modules?: Modules;
  actions?: Actions;
};
