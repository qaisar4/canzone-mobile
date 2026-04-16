let authToken: string | null = null;

export const tokenStore = {
  get: () => authToken,
  set: (token: string) => {
    console.log('set token', token);
    authToken = token;
  },
  clear: () => {
    authToken = null;
  },
};
