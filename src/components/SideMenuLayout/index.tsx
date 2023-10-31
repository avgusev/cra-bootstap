import classes from './SideMenuLayout.module.scss';
import { ReactNode } from 'react';
import Training from '../../features/Training';

// вложенные div используются для правильного отображения scroll
function SideMenuLayout({
  menuHeader,
  menu,
  children,
}: {
  menuHeader?: ReactNode;
  menu: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={classes.menuWrapper}>
      <aside className={classes.menu}>
        <Training id="passport" step={1} isNoShadow className="h-100">
          <>
            {menuHeader}
            {menu && (
              <div style={{ width: 'var(--menu-width)', height: 'calc( 100% - 5rem )', overflowX: 'hidden' }}>
                <div style={{ width: 'var(--menu-width)', overflowX: 'auto' }}>{menu}</div>
              </div>
            )}
          </>
        </Training>
      </aside>

      <div className={classes.children}>{children}</div>
    </div>
  );
}

export default SideMenuLayout;
