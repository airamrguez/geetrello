import { TokenStorage } from './auth';

const DEFAULT_OPTIONS = {
  method: 'GET',
  parseResponse: (response) => response.json().catch(() => {}),
};

export function fetchJSON(url, options) {
  return request(url, { ...DEFAULT_OPTIONS, ...options });
}

export function fetchText(url, options) {
  return request(url, {
    ...DEFAULT_OPTIONS,
    ...options,
    parseResponse: (response) => response.text(),
  });
}

export const createJSONFetcher = (baseOptions) => {
  return (url, options) => fetchJSON(url, { ...baseOptions, ...options });
};

function request(url, options) {
  const controller = new AbortController();
  const { body, parseResponse, includeAuth, ...rest } = options;
  const { signal } = controller;
  return {
    promise: fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(includeAuth
          ? { Authorization: `Bearer ${TokenStorage.get()}` }
          : undefined),
      },
      ...(body ? { body: JSON.stringify(body) } : undefined),
      signal,
      ...rest,
    }).then((response) => {
      if (response.ok) {
        return parseResponse(response);
      }
      const error = new Error(response.statusText);
      error.status = response.status;
      throw error;
    }),
    controller,
  };
}
