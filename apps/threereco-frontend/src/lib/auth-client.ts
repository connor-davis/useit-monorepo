import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL:
    import.meta.env.VITE_ENV === 'production'
      ? 'https://3reco.lone-wolf.dev'
      : 'http://localhost:6173', // the base url of your auth server
});
