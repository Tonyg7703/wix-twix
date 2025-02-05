import { ApiKeyStrategy, createClient } from '@wix/sdk';
import { merge } from '@/utils/merge';
import type {
  TwixProps,
  TwixAdminAuth,
  WixAdminClient,
  TwixActions,
  WixModules,
} from './types';

export function createAdmin<
  Client extends WixAdminClient<Modules>,
  Actions extends TwixActions<Client>,
  Modules extends WixModules,
>({
  auth: { apiKey, siteId, accountId },
  modules = {} as Modules,
  actions = {} as Actions,
}: TwixProps<TwixAdminAuth, Modules, Actions>) {
  if (!apiKey) {
    throw new Error('WIX_API_KEY is required for server client');
  }

  if (!siteId) {
    throw new Error('WIX_SITE_ID is required for server client');
  }
  const auth = ApiKeyStrategy({ apiKey, siteId, accountId });
  const client = createClient({ auth, modules });
  return merge({ client, ...actions });
}
