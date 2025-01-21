import {
  ApiKeyStrategy,
  type Descriptors,
  type IApiKeyStrategy,
} from '@wix/sdk';
import { WixClient } from '../wixClient';
import { ServerClientEnv } from '../wixClient.types';

export abstract class WixServerClient<
  Modules extends Descriptors,
> extends WixClient<Modules, IApiKeyStrategy, ServerClientEnv> {
  constructor(modules?: Modules) {
    super({ modules });
  }

  protected getEnvVariables(): ServerClientEnv {
    const siteId = this.getEnvVariable('siteId');
    const accountId = this.getEnvVariable('accountId');
    const apiKey = this.getEnvVariable('apiKey');
    return { siteId, accountId, apiKey };
  }

  protected getAuthStrategy(): IApiKeyStrategy {
    const { apiKey, accountId, siteId } = this.getEnvVariables();
    return ApiKeyStrategy({ apiKey, accountId, siteId });
  }
}
