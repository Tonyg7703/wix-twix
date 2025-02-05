import { createClient, OAuthStrategy } from '@wix/sdk';
import { merge } from '@/utils/merge';
import type {
  TwixModules,
  TwixWebType,
  TwixWebActions,
  TwixWebProps,
} from './types';

export function createWeb<
  Modules extends TwixModules,
  Actions extends TwixWebActions<Modules>,
>({
  auth: authParams,
  modules = {} as Modules,
  actions = {} as Actions,
}: TwixWebProps<Modules, Actions>): TwixWebType<Modules, Actions> {
  if (!authParams.clientId) {
    throw new Error('clientId is required for web client');
  }

  const auth = OAuthStrategy(authParams);
  const client = createClient({ auth, modules });
  return merge({ client, ...actions });
}
