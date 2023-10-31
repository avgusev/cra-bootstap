import classNames from 'classnames';
import { Header } from '@tanstack/react-table';

type ResizerProps<TData> = { header: Header<TData, unknown> };

function Resizer<TData>({ header }: ResizerProps<TData>) {
  const isResizing = header.column.getIsResizing();
  // const isResizing =
  //   header.column.getIsResizing() ||
  //   (header.column.parent?.getIsResizing() &&
  //     header.column.parent?.columns.filter((col) => col.getIsVisible())?.at(-1)?.id === header.column.id);

  const table = header.getContext().table;
  const columnResizeMode = table.options.columnResizeMode;
  const deltaOffset = table.getState().columnSizingInfo.deltaOffset;

  return (
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={classNames('resizer', { isResizing })}
      style={{ transform: columnResizeMode === 'onEnd' && isResizing ? `translateX(${deltaOffset}px)` : '' }}
    />
  );
}

export default Resizer;
