import classNames from 'classnames';
import SkdfIcon from '../SkdfIcon';
import pageArray from './pageArray';
import PaginationItem from './PaginationItem';

type PaginationProps = {
  className?: string;
  count?: number;
  page?: number;
  marginPagesDisplayed?: number;
  edgePagesDisplayed?: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

function Pagination({
  className = 'mb-0',
  count = 1,
  page = 1,
  marginPagesDisplayed: margin = 2,
  edgePagesDisplayed: edge = 1,
  isLoading = false,
  onPageChange,
}: PaginationProps) {
  if (count < 0) count = 0;
  if (page < 1) page = 1;
  if (margin < 0) margin = 0;
  if (edge < 0) edge = 0;
  if (page > count) page = count;

  return (
    <ul className={classNames('pagination gap-2', className)}>
      <PaginationItem disabled={isLoading || page <= 1} onClick={() => onPageChange(page - 1)}>
        <SkdfIcon name="arrow_left" />
      </PaginationItem>

      {pageArray({ page, count, margin, edge }).map((item, index) =>
        typeof item === 'number' ? (
          <PaginationItem
            key={index}
            disabled={isLoading}
            className={classNames({ active: item === page })}
            onClick={() => onPageChange(item)}
            children={item}
          />
        ) : (
          <PaginationItem
            key={index} // String(item) ???
            title={item[0]}
            disabled={isLoading}
            // onClick={() => (index === edge ? onPageChange(page - (1 + margin)) : onPageChange(page + (1 + margin)))}
            // onClick={() => (item[1] === 'left' ? onPageChange(page - (1 + margin)) : onPageChange(page + (1 + margin)))}
            onClick={() => {
              if (item[1] === 'left') onPageChange(item[3]);
              if (item[1] === 'right') onPageChange(item[2]);
            }}
            // onClick={() =>
            //   item[1] === 'left'
            //     ? onPageChange(Math.ceil((item[2] + item[3]) / 2))
            //     : onPageChange(Math.floor((item[2] + item[3]) / 2))
            // }
            children="..."
          />
          // <PaginationItem key={String(item)} title={item[0]} disabled children="..." />
        )
      )}

      <PaginationItem disabled={isLoading || page >= count} onClick={() => onPageChange(page + 1)}>
        <SkdfIcon name="arrow_right" />
      </PaginationItem>
    </ul>
  );
}

export type { PaginationProps };
export default Pagination;
