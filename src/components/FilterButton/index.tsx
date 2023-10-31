import { ForwardedRef, forwardRef } from 'react';
import Button, { ButtonProps } from '../Button';
import SkdfIcon from '../SkdfIcon';
import Badge from '../Badge';
import classNames from 'classnames';

type FilterButtonProps = ButtonProps & {
  count?: number;
};

function FilterButton({ count, className = '', ...props }: FilterButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <Button ref={ref} className={classNames('btn-icon', className)} style={{ minWidth: '10.75rem' }} {...props}>
      <SkdfIcon name="filter" />
      Фильтры
      {count !== undefined && <Badge round>{count}</Badge>}
    </Button>
  );
}

export default forwardRef(FilterButton);
