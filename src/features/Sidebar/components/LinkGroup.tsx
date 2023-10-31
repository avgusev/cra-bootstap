import { ReactNode } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import SkdfIcon from '../../../components/SkdfIcon';
import { TMenuItemGroup, TMenuItemWithAccessKey } from '../../../menu';

import classes from '../Sidebar.module.scss';

import { accessMatrixStoreInstance } from '../../AccessMatrix/store';

type LinkGroupProps = {
  activeMenuGroup: TMenuItemGroup | null;
  onClick: (group: TMenuItemGroup, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
} & TMenuItemGroup;

type AccessWrapperProps = {
  title: string;
  sub: LinkGroupProps['sub'];
  children: ReactNode;
};

const AccessWrapper = observer(({ title, sub, children }: AccessWrapperProps) => {
  const haveSubWithoutAccessKey = !sub.every((link) => link.accessKey);
  if (haveSubWithoutAccessKey) return <>{children}</>;

  const subWithAccessKeys = sub.filter(
    (link) => Object.hasOwn(link, 'accessKey') && link.accessKey !== undefined
  ) as TMenuItemWithAccessKey[];
  const accessKeys = subWithAccessKeys.map((link) => link.accessKey);
  const showGroup = accessMatrixStoreInstance.doesHaveAccessAtLeastOne(accessKeys);

  return <>{showGroup ? children : null}</>;
});

const LinkGroup = ({ title, icon, sub, activeMenuGroup, onClick }: LinkGroupProps) => {
  const isActiveGroup = activeMenuGroup?.title === title;
  const isActiveSub = !!sub.find((l) => l.path === decodeURI(window.location.pathname));
  const active = isActiveGroup || isActiveSub;

  return (
    <AccessWrapper title={title} sub={sub}>
      <a
        href="/"
        className={classNames(classes.navLink, { [classes.active]: active })}
        onClick={(e) => onClick({ title, icon, sub }, e)}
      >
        <SkdfIcon name={icon} />
        <span className={classes.navLinkTitle}>{title}</span>
      </a>
    </AccessWrapper>
  );
};

export { LinkGroup };
