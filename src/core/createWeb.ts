import { createClient, OAuthStrategy } from '@wix/sdk';
import { merge } from '@/utils/merge';
import type {
  TwixActions,
  TwixProps,
  TwixWebAuth,
  WixModules,
  WixWebClient,
} from './types';

export function createWeb<
  Client extends WixWebClient<Modules>,
  Actions extends TwixActions<Client>,
  Modules extends WixModules,
>({
  auth: authParams,
  modules = {} as Modules,
  actions = {} as Actions,
}: TwixProps<TwixWebAuth, Modules, Actions>) {
  if (!authParams.clientId) {
    throw new Error('clientId is required for web client');
  }

  const auth = OAuthStrategy(authParams);
  const client = createClient({ auth, modules });
  return merge({ client, ...actions });
}
