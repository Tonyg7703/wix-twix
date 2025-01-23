import { createClient } from '@wix/sdk';
import { CLIENT_ENV_MAP } from './wixClient.constants';
import type {
  Client,
  ClientProps,
  ClientEnv,
  ClientEnvName,
  Modules,
  AuthStrategy,
} from './wixClient.types';

export abstract class WixClient<
  M extends Modules,
  A extends AuthStrategy,
  E extends ClientEnv,
> {
  client: Client<M, A>;
  protected abstract getAuthStrategy(): A;
  protected abstract getEnvVariables(): E;

  constructor({ modules }: ClientProps<M>) {
    this.client = this.createClient(modules);
  }

  protected getEnvVariable(name: ClientEnvName<E>): string {
    const envName = CLIENT_ENV_MAP[name];
    const envValue = process.env[envName];
    if (!envValue) {
      throw new Error(`Missing ${envName} enviroment variable`);
    }
    return envValue;
  }

  protected createClient(modules?: M) {
    const auth = this.getAuthStrategy();
    return createClient({ auth, modules });
  }
}
