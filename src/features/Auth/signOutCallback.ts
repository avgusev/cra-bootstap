import { UserManager } from 'oidc-client-ts';
import { userManagerSettings } from '../../userManagerSettings';

const userManager = new UserManager({ ...userManagerSettings, response_mode: 'query' });
userManager
  .signoutRedirectCallback()
  .then(function () {
    let afterSignOutRedirect: string | null = null;
    try {
      afterSignOutRedirect = localStorage.getItem('afterSignOutRedirect');
      localStorage.removeItem('afterSignOutRedirect');
    } catch (e) {
      console.warn('Browser in private mode, using default route...');
    }
    window.location.href = afterSignOutRedirect || '/';
  })
  .catch(function (e) {
    console.error(e);
  });
