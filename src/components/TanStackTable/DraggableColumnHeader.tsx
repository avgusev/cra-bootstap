import { MouseEventHandler } from 'react';
import { Column, ColumnOrderState, flexRender, Header } from '@tanstack/react-table';
import classNames from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import Button from '../Button';
import SkdfIcon from '../SkdfIcon';

import Resizer from './Resizer';
import Training from '../../features/Training';

const reorderColumn = (draggedColumnId: string, targetColumnId: string, columnOrder: string[]): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

type DraggableColumnHeaderProps<TData> = {
  index: number;
  header: Header<TData, unknown>;
  activeLeafIds: string[];
  className?: string;
  onColumnClick: (columnId?: string) => void;
  onDropdownBtnClick: MouseEventHandler<HTMLButtonElement>;
};

function DraggableColumnHeader<TData>({
  index,
  header,
  onColumnClick,
  activeLeafIds,
  className,
  onDropdownBtnClick,
}: DraggableColumnHeaderProps<TData>) {
  const { column, getSize, getContext } = header;
  const { table } = getContext();
  const { getState, setColumnOrder, getAllLeafColumns } = table;
  const { columnOrder } = getState();

  const columnLeafIds = column.getLeafColumns().map((col) => col.id);

  const isActive = columnLeafIds.toString() === activeLeafIds.toString();
  const isFocused = activeLeafIds.toString().includes(columnLeafIds.toString());

  const [{ isOver }, connectDropTarget] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<TData>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder.length > 0 ? columnOrder : getAllLeafColumns().map((p) => p.id)
      );
      setColumnOrder(newColumnOrder);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging, dragItemId, dragOffsetDiffX }, connectDragSource, connectDragPreview] = useDrag({
    type: 'column',
    canDrag: () => isActive,
    item: () => column,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      dragItemId: monitor.getItem()?.id,
      dragOffsetDiffX: monitor.getDifferenceFromInitialOffset()?.x,
    }),
  });

  const isDropTarget = isOver && dragItemId !== column.id;

  const div = (
    <div
      ref={connectDragSource}
      className={classNames({ isDragging })}
      style={{ cursor: isActive ? (isDragging ? 'move' : 'grab') : 'auto' }}
      onClick={() => onColumnClick(isActive ? undefined : column.id)}
    >
      {flexRender(column.columnDef.header, getContext())}
      <Button
        variant="function"
        style={{ height: '20px', verticalAlign: 'text-top' }}
        icon={<SkdfIcon name="small_down" width={12} height={12} />}
        onClick={onDropdownBtnClick}
        className="text-primary position-absolute th-btn-dropdown"
      />
    </div>
  );

  return (
    <th
      ref={(el) => {
        connectDropTarget(el);
        connectDragPreview(el);
      }}
      scope="col"
      style={{ width: getSize() }}
      className={classNames('fw-normal', className, {
        'table-focus': isFocused,
        'is-dragging': isDragging,
        'left-shadow-line': isDropTarget && dragOffsetDiffX && dragOffsetDiffX < 0,
        'right-shadow-line': isDropTarget && dragOffsetDiffX && dragOffsetDiffX > 0,
      })}
    >
      {index === 1 ? (
        <Training id="registry" step={1}>
          {div}
        </Training>
      ) : (
        div
      )}
      {isActive && column.getCanResize() && <Resizer header={header} />}
    </th>
  );
}

export default DraggableColumnHeader;
