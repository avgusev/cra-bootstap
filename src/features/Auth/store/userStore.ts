import { action, makeObservable, observable } from 'mobx';
import { Log, User, UserManager } from 'oidc-client-ts';

import { accessMatrixStoreInstance } from '../../AccessMatrix/store';
import { userManagerSettings } from '../../../userManagerSettings';

export class UserStore {
  #userManager: UserManager;
  #accessMatrix = accessMatrixStoreInstance;
  public user: User | 'anonymous' | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      getUser: action,
      setUser: action,
      renewToken: action,
    });
    // User manager
    this.#userManager = new UserManager(userManagerSettings);
    Log.setLogger(console);
    Log.setLevel(Log.INFO);
  }

  get isSignedIn() {
    return this.user !== null && this.user !== 'anonymous';
  }

  login() {
    localStorage.setItem('afterSignInRedirect', window.location.href);
    return this.#userManager.signinRedirect();
  }

  logout() {
    localStorage.setItem('afterSignOutRedirect', window.location.href);
    return this.#userManager.signoutRedirect();
  }

  init = async () => {
    await this.querySessionStatus();
    await this.getUser();
  };

  setUser = (user: User | 'anonymous' | null) => {
    this.user = user;
    if (this.user !== null && this.user !== 'anonymous') {
      this.#accessMatrix.getAccessMatrix();
    } else {
      this.#accessMatrix.setDone();
    }
  };

  getUser = async () => {
    const user = await this.#userManager.getUser();
    this.setUser(user ? user : 'anonymous');
  };

  renewToken = async () => {
    return this.#userManager
      .signinSilent()
      .then((user) =>
        action(() => {
          this.setUser(user ? user : 'anonymous');
        })
      )
      .catch((reason) => Promise.reject(reason));
  };

  querySessionStatus = async () => {
    await this.#userManager.getUser();
    if (this.user !== null && this.user !== 'anonymous') {
      await this.#userManager
        .querySessionStatus()
        .then((status) => {
          console.log('[Auth]: status', status);
        })
        .catch(async (e) => {
          if (e.error === 'login_required') {
            await this.#userManager.removeUser();
            this.setUser('anonymous');
          }
        });
    }
  };

  removeUser = async () => {
    await this.#userManager.removeUser();
  };
}

const userStoreInstance = new UserStore();

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window['userStoreInstance'] = userStoreInstance;
}

export default userStoreInstance;
