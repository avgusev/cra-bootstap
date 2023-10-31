import { UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts';

// Vite config "base" setting don't rewrite BASE_URL env variable :(
const BASE_URL = import.meta.env.VITE_PUBLIC_URL || window.location.origin;
const AUTHORITY_URL = import.meta.env.VITE_AUTHORITY_URL || 'https://is4-specialist.dev1.skdf.local/';
const CLIENT_ID = import.meta.env.VITE_AUTHORITY_CLIENT_ID || 'skdf';
const CLIENT_SECRET = import.meta.env.VITE_AUTHORITY_CLIENT_SECRET || '820564e6-f3e2-4ffd-8f2a-7fbc866d855c';
const SIGNIN_CALLBACK_URL = import.meta.env.VITE_AUTHORITY_SIGNIN_CALLBACK_URL || '/callback';
const SIGNOUT_CALLBACK_URL = import.meta.env.VITE_AUTHORITY_SIGNOUT_CALLBACK_URL || '';

export const userManagerSettings: UserManagerSettings = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: `${BASE_URL}${SIGNIN_CALLBACK_URL}`,
  post_logout_redirect_uri: `${BASE_URL}${SIGNOUT_CALLBACK_URL}`,
  response_type: 'code',
  scope: 'openid profile skdf_api',
  authority: AUTHORITY_URL,
  silent_redirect_uri: `${BASE_URL}/silentRenew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  accessTokenExpiringNotificationTimeInSeconds: 10,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};
