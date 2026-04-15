import { wait } from '../utils/helpers';
import { apiConfig } from './config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Primitive = string | number | boolean;

type RequestOptions<T> = {
  endpoint: string;
  method?: HttpMethod;
  query?: Record<string, Primitive | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  mockDelayMs?: number;
  mockHandler: () => Promise<T> | T;
};

const buildUrl = (
  baseUrl: string,
  endpoint: string,
  query?: RequestOptions<unknown>['query'],
) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${baseUrl}${cleanEndpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
};

const parseResponse = async <T>(response: Response) => {
  const raw = await response.text();
  const data = raw ? (JSON.parse(raw) as T) : ({} as T);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return data;
};

export const apiClient = {
  async request<T>({
    endpoint,
    method = 'GET',
    query,
    body,
    headers,
    mockDelayMs = 250,
    mockHandler,
  }: RequestOptions<T>) {
    if (apiConfig.provider === 'mock') {
      await wait(mockDelayMs);
      return mockHandler();
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), apiConfig.timeoutMs);

    try {
      const response = await fetch(buildUrl(apiConfig.baseUrl, endpoint, query), {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      return await parseResponse<T>(response);
    } finally {
      clearTimeout(timeout);
    }
  },
};
