import { createAuthClient } from 'better-auth/react';

import { adminClient, twoFactorClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL:
    import.meta.env.VITE_ENV === 'production'
      ? 'https://3reco.lone-wolf.dev'
      : 'http://localhost:6173', // the base url of your auth server
  plugins: [twoFactorClient(), adminClient()],
});
