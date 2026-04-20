import { tokenStore } from '../utils/tokenStore';
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
  mockHandler?: () => Promise<T> | T;
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
    const errorPayload = data as {
      message?: string;
      error?: string | { code?: string; message?: string };
      details?: unknown;
      errors?: unknown;
    };
    const serverMessage =
      errorPayload.message ||
      (typeof errorPayload.error === 'string'
        ? errorPayload.error
        : errorPayload.error?.message) ||
      (typeof errorPayload.details === 'string' ? errorPayload.details : '') ||
      (typeof errorPayload.errors === 'string' ? errorPayload.errors : '');
    throw new Error(
      serverMessage
        ? `Request failed (${response.status}): ${serverMessage}`
        : `Request failed (${response.status})`,
    );
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
      if (!mockHandler) {
        throw new Error('Mock handler is required when API provider is mock');
      }
      await wait(mockDelayMs);
      return mockHandler();
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), apiConfig.timeoutMs);
    const requestUrl = buildUrl(apiConfig.baseUrl, endpoint, query);
    console.log(`[API] ${method} ${requestUrl}`);

    try {
      const token = tokenStore.get();
      const response = await fetch(requestUrl, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      return await parseResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message} (URL: ${requestUrl})`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  },
};
