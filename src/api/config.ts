export type AppEnv = 'development' | 'staging' | 'production';
export type ApiProvider = 'mock' | 'rest';

type ApiConfig = {
  env: AppEnv;
  provider: ApiProvider;
  baseUrl: string;
  timeoutMs: number;
};

const runtimeProvider = (globalThis as Record<string, unknown>)
  .__CANZONE_API_PROVIDER;
const runtimeBaseUrl = (globalThis as Record<string, unknown>)
  .__CANZONE_API_BASE_URL;

const env: AppEnv = __DEV__ ? 'development' : 'production';

const baseUrls: Record<AppEnv, string> = {
  development: 'https://dev-api.canzone.app',
  staging: 'https://staging-api.canzone.app',
  production: 'https://api.canzone.app',
};

const provider: ApiProvider =
  runtimeProvider === 'rest' || runtimeProvider === 'mock'
    ? runtimeProvider
    : 'mock';

export const apiConfig: ApiConfig = {
  env,
  provider,
  baseUrl:
    typeof runtimeBaseUrl === 'string' && runtimeBaseUrl.length > 0
      ? runtimeBaseUrl
      : baseUrls[env],
  timeoutMs: 8000,
};
