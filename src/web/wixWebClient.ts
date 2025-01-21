import {
  OAuthStrategy,
  type Descriptors,
  type IOAuthStrategy,
  type Tokens,
} from '@wix/sdk';
import { WixClient } from '../wixClient';
import { WebClientEnv } from '../wixClient.types';

export abstract class WixWebClient<
  Modules extends Descriptors,
> extends WixClient<Modules, IOAuthStrategy, WebClientEnv> {
  constructor(modules?: Modules) {
    super({ modules });
  }

  protected getEnvVariables(): WebClientEnv {
    const clientId = this.getEnvVariable('clientId');
    return { clientId };
  }

  protected getAuthStrategy(tokens?: Tokens): IOAuthStrategy {
    const { clientId } = this.getEnvVariables();
    return OAuthStrategy({
      clientId,
      tokens,
    });
  }
}
