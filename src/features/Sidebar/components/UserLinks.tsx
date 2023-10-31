import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import SkdfIcon from '../../../components/SkdfIcon';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';

import { userStoreInstance } from '../../Auth/store';
import classes from '../Sidebar.module.scss';
import { observer } from 'mobx-react-lite';

const UserLinksComponent = () => {
  const { user } = userStoreInstance;

  if (user === null || user === 'anonymous') {
    return (
      <div key="signInLink" className={classes.signInLink}>
        <Button icon="login" variant="function" className={classes.navLink} onClick={() => userStoreInstance.login()}>
          <span className={classes.navLinkTitle}>Вход</span>
        </Button>
      </div>
    );
  }

  const { profile } = user;
  return (
    <div key="userLinks" className={classes.userLinks}>
      <NavLink
        to="/account"
        className={({ isActive }) => classNames(classes.navLink, classes.grow1, { [classes.active]: isActive })}
      >
        <Avatar src={profile.avatar as string} size={36} name={profile.full_name as string} />
        <span className={classes.navLinkTitle}>{profile.full_name as string}</span>
      </NavLink>
      <Button variant="function" onClick={() => userStoreInstance.logout()} className={classes.navLink}>
        <SkdfIcon name="leave" />
      </Button>
    </div>
  );
};

const UserLinks = observer(UserLinksComponent);

export { UserLinks };
