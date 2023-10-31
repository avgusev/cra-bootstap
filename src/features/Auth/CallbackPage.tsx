// TODO: remove this page after DevOpses add correct URIs to IdentityServer
import { useEffect } from 'react';

import { UserManager } from 'oidc-client-ts';
import { userManagerSettings } from '../../userManagerSettings';

const CallbackPage = () => {
  useEffect(() => {
    const userManager = new UserManager({ ...userManagerSettings, response_mode: 'query' });
    userManager
      .signinRedirectCallback()
      .then(function () {
        let afterSignInRedirect: string | null = null;
        try {
          afterSignInRedirect = localStorage.getItem('afterSignInRedirect');
          localStorage.removeItem('afterSignInRedirect');
        } catch (e) {
          console.warn('Browser in private mode, using default route...');
        }
        window.location.href = afterSignInRedirect || '/';
      })
      .catch(function (e) {
        console.error(e);
      });
  }, []);

  return <></>;
};

export default CallbackPage;
