import { ApiKeyStrategy, createClient } from '@wix/sdk';
import { merge } from '@/utils/merge';
import type {
  TwixModules,
  TwixAdminType,
  TwixAdminActions,
  TwixAdminProps,
} from './types';

export function createAdmin<
  Modules extends TwixModules,
  Actions extends TwixAdminActions<Modules>,
>({
  auth: authParams,
  modules = {} as Modules,
  actions = {} as Actions,
}: TwixAdminProps<Modules, Actions>): TwixAdminType<Modules, Actions> {
  if (!authParams.apiKey) {
    throw new Error('WIX_API_KEY is required for server client');
  }

  if (!authParams.siteId) {
    throw new Error('WIX_SITE_ID is required for server client');
  }
  const auth = ApiKeyStrategy(authParams);
  const client = createClient({ auth, modules });
  return merge({ client, ...actions });
}
