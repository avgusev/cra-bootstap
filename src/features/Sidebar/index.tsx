import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { menu1, menu2, TMenuItemGroup } from '../../menu';

import classes from './Sidebar.module.scss';
import { ReactComponent as IconLogo } from './symbol-skdf.svg';

import { UserLinks } from './components/UserLinks';
import SidebarLink from './components/SidebarLink';
import { LinkGroup } from './components/LinkGroup';

import { sidebarStoreInstance } from './store';
import { trainingStore } from '../Training/store';

function Sidebar() {
  // const match = useRouteMatch();
  const location = useLocation();

  const { isActive, isSubActive, activeMenuGroup, subItems, setActive, toggleLinkGroup, close } = sidebarStoreInstance;

  const linkGroupClick = (group: TMenuItemGroup, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    toggleLinkGroup(group);
    e.preventDefault();
  };

  useEffect(() => {
    close();
  }, [location, close]);

  return (
    <>
      <aside
        className={classes.sidebar}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={close}
        style={trainingStore.isOpenTrening ? {} : { zIndex: 20 }}
      >
        <div className={classNames(classes.main, { [classes.active]: isActive })}>
          <a href="/" className={classes.logo}>
            <IconLogo />
            <span className={classes.logoTitle}>СКДФ</span>
          </a>

          <nav className={classes.nav}>
            <SidebarLink path="/skdf-design" title="SkdfDesign" icon="plug" />
          </nav>

          <nav className={classes.nav}>
            {menu1.map((item) =>
              'path' in item ? (
                <SidebarLink key={item.path} {...item} />
              ) : (
                <LinkGroup key={item.title} activeMenuGroup={activeMenuGroup} onClick={linkGroupClick} {...item} />
              )
            )}
          </nav>
          {/*<pre>{JSON.stringify(location, null, 2)}</pre>*/}

          <div className={classes.grow1}></div>

          <nav className={classes.nav}>
            {menu2.map((item) =>
              'path' in item ? (
                <SidebarLink key={item.path} {...item} />
              ) : (
                <LinkGroup key={item.title} activeMenuGroup={activeMenuGroup} onClick={linkGroupClick} {...item} />
              )
            )}
          </nav>
          <hr className={classes.divider} />
          <nav className={classes.nav}>
            <UserLinks />
          </nav>
        </div>
        <div className={classNames(classes.subBar, { [classes.active]: isSubActive })}>
          <nav className={classes.nav}>
            {subItems?.map((item) => (
              <SidebarLink key={item.path} {...item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default observer(Sidebar);
