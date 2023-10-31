import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { Nav } from 'react-bootstrap';
import Button from '../../components/Button';
import DocTitle from '../../components/DocTitle';
import SideMenuLayout from '../../components/SideMenuLayout';
import SkdfIcon from '../../components/SkdfIcon';
import Header from './components/Header';

import { notificationStore } from './store';

function NotificationsPage() {
  const {
    notificationMenu,
    searchText,
    notificationType,
    filteredNotifications,
    setSearchText,
    setNotificationType,
    getNotificationCount,
  } = notificationStore;

  return (
    <>
      <DocTitle title="Уведомления" />
      <SideMenuLayout
        menuHeader={
          <div className="pt-4 pb-2 px-4">
            <input
              type="search"
              className="form-control"
              placeholder="Поиск"
              spellCheck={false}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        }
        menu={
          <div className="pt-2 pe-4 pb-0 ps-2.5">
            <Nav variant="pills" className="skdf flex-column gap-1">
              {notificationMenu.map((notification, index) => (
                <Button
                  key={index}
                  className={classNames('text-start nav-link', {
                    active: notification.id === notificationType,
                  })}
                  onClick={() => setNotificationType(notification.id)}
                >
                  {notification.label}
                  <span className="text-caption ms-2">{getNotificationCount(notification.id)}</span>
                </Button>
              ))}
            </Nav>
          </div>
        }
      >
        <div id="block-common">
          <Header />
        </div>
        <div className="container-fluid ps-4 pt-3">
          <div className="d-grid gap-4">
            {filteredNotifications.length ? (
              filteredNotifications.map((item, index) => (
                <div key={index} className="d-flex gap-2.5">
                  <SkdfIcon name={item.icon} className="text-placeholder align-items-start" />
                  <div className="d-grid flex-grow-1 gap-2">
                    <span className={classNames({ 'fw-semibold': item.isUnread })}>{item.title}</span>
                    <span className="text-placeholder" dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                  <span className="text-placeholder text-nowrap">{item.date}</span>
                </div>
              ))
            ) : (
              <div className="d-flex align-items-start text-muted">Не найдено</div>
            )}
          </div>
        </div>
      </SideMenuLayout>
    </>
  );
}

export default observer(NotificationsPage);
