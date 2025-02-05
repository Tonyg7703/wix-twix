import type {
  WixClient as Client,
  Descriptors,
  Tokens,
  IApiKeyStrategy,
  IOAuthStrategy,
} from '@wix/sdk';

// Wix Client types -----------------------------------------------------------
export type TwixModules = Descriptors;

export type WixClient<M extends TwixModules = object> =
  | WixWebClient<M>
  | WixAdminClient<M>;

export type WixWebClient<M extends TwixModules = object> = Client<
  undefined,
  IOAuthStrategy,
  M
>;

export type WixAdminClient<T extends TwixModules = object> = Client<
  undefined,
  IApiKeyStrategy,
  T
>;

// Twix types -----------------------------------------------------------------
export type TwixAuth = TwixWebAuth | TwixAdminAuth;
export type TwixBase<C extends WixClient> = { client: C };
type TwixActionHandler<C extends WixClient> = (
  this: TwixBase<C>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => unknown | Promise<unknown>;

type TwixActions<C extends WixClient> = Record<
  string | number | symbol,
  TwixActionHandler<C>
>;

type Twix<
  Modules extends TwixModules,
  Client extends WixClient<Modules>,
  Actions extends TwixActions<Client>,
> = TwixBase<Client> & Actions;

type TwixProps<
  Auth extends TwixAuth,
  Modules extends TwixModules,
  Client extends WixClient<Modules>,
  Actions extends TwixActions<Client>,
> = {
  auth: Auth;
  modules?: Modules;
  actions?: Actions;
};

// Twix Web types -------------------------------------------------------------
export type TwixWebAuth = {
  clientId: string;
  tokens?: Tokens;
};

export type TwixWeb<M extends TwixModules = object> = TwixBase<WixWebClient<M>>;

export type TwixWebActions<M extends TwixModules> = TwixActions<
  WixWebClient<M>
>;

export type TwixWebType<
  Modules extends TwixModules,
  Actions extends TwixWebActions<Modules>,
> = Twix<Modules, WixWebClient<Modules>, Actions>;

export type TwixWebProps<
  Modules extends TwixModules,
  Actions extends TwixWebActions<Modules>,
> = TwixProps<TwixWebAuth, Modules, WixWebClient<Modules>, Actions>;

// Twix Admin types -----------------------------------------------------------
export type TwixAdminAuth = {
  apiKey: string;
  siteId: string;
  accountId?: string;
};

export type TwixAdmin<M extends TwixModules = object> = TwixBase<
  WixAdminClient<M>
>;
export type TwixAdminActions<M extends TwixModules> = TwixActions<
  WixAdminClient<M>
>;

export type TwixAdminType<
  Modules extends TwixModules,
  Actions extends TwixAdminActions<Modules>,
> = Twix<Modules, WixAdminClient<Modules>, Actions>;

export type TwixAdminProps<
  Modules extends TwixModules,
  Actions extends TwixAdminActions<Modules>,
> = TwixProps<TwixAdminAuth, Modules, WixAdminClient<Modules>, Actions>;
