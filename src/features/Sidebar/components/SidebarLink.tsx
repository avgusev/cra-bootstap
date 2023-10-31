import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import classes from '../Sidebar.module.scss';
import SkdfIcon from '../../../components/SkdfIcon';
import Badge from '../../../components/Badge';
import type { TMenuItem } from '../../../menu';

import { accessMatrixStoreInstance } from '../../AccessMatrix/store';
import { notificationStore } from '../../../pages/NotificationsPage/store';

function SidebarLink({ path, icon, title, accessKey }: TMenuItem) {
  const { doesHaveAccess } = accessMatrixStoreInstance;
  const haveAccess = accessKey ? doesHaveAccess(accessKey) : true;

  return (
    <>
      {haveAccess ? (
        <NavLink to={path} className={({ isActive }) => classNames(classes.navLink, { [classes.active]: isActive })}>
          {path === '/notifications' ? (
            <span className="d-inline-block position-relative">
              {icon && <SkdfIcon name={icon} />}
              {notificationStore.unreadCount > 0 && <Badge counter>{notificationStore.unreadCount}</Badge>}
            </span>
          ) : (
            icon && <SkdfIcon name={icon} />
          )}

          <span className={classes.navLinkTitle}>{title}</span>
        </NavLink>
      ) : null}
    </>
  );
}

export default observer(SidebarLink);
