import classNames from 'classnames';
import { MouseEventHandler, PropsWithChildren } from 'react';

type PaginationItemProps = {
  className?: string;
  title?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function PaginationItem({
  className,
  title,
  disabled = false,
  onClick,
  children,
}: PropsWithChildren<PaginationItemProps>) {
  if (disabled)
    return (
      <li className={classNames('page-item disabled', className)} title={title}>
        <span className="page-link">{children}</span>
      </li>
    );
  return (
    <li className={classNames('page-item', className)}>
      <button className="page-link" onClick={onClick} title={title}>
        {children}
      </button>
    </li>
  );
}

export type { PaginationItemProps };
export default PaginationItem;
