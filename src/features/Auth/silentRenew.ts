import { UserManager } from 'oidc-client-ts';
import { userManagerSettings } from '../../userManagerSettings';

const userManager = new UserManager(userManagerSettings);
userManager.signinSilentCallback().catch((error) => {
  console.warn(error);
});
