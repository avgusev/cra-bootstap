import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useRootClose } from '@restart/ui';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnResizeMode,
  ColumnOrderState,
  ColumnDef,
  ExpandedState,
  getExpandedRowModel,
  Row,
  Cell,
} from '@tanstack/react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DraggableColumnHeader from './DraggableColumnHeader';
import RowSettingsOverlay from './RowSettingsOverlay';
import ColumnsSettingsOverlay from './ColumnsSettingsOverlay';
import Button from '../Button';
import SkdfIcon from '../SkdfIcon';
import Training from '../../features/Training';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    title: string;
    headerClassName?: string;
    className?: string;
    settingsColumn?: boolean;
    private?: boolean;
  }
}

type TanStackTableProps<TData> = {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  columnVisibility?: string[];
  columnOrder?: string[];
  pagination?: ReactNode;
  onSortAsc?: (id: string) => void;
  onSortDesc?: (id: string) => void;
  onChangeColumnVisibility?: (cols: string[]) => void;
  onChangeColumnOrder?: (cols: string[]) => void;
};

function calculateDepth<TData>(tableRows: Row<TData>[]): number {
  return tableRows.reduce((depth, row) => {
    const subRows = row.subRows.length > 0 ? 1 : 0;
    if (row.depth + subRows > depth) {
      depth = row.depth + subRows;
    }

    return depth;
  }, 0);
}

function DotLine<TData>({ cell, nextRow }: { cell: Cell<TData, unknown>; nextRow: Row<TData> }) {
  const row = cell.row;
  // const path = row.id.split('.');
  // const nextRow = cell.getContext().table.getRowModel().rows[rowIndex + 1];
  const isLast = nextRow && nextRow.depth < cell.row.depth;
  const linesArray = Array.from(Array(row.depth).keys());

  return (
    <div className="d-flex">
      {row.depth > 0 ? (
        <>
          {linesArray.map((n) => (
            <div
              key={n}
              className={classNames('line', { 'line-end': isLast && n === linesArray.length - 1 })}
              style={{ transform: `translateX(${n * 40}px)` }}
            />
          ))}
          <SkdfIcon
            name="dot"
            className="text-muted me-3"
            style={{ transform: `translateX(${(row.depth - 1) * 40}px)` }}
          />
        </>
      ) : null}
      {row.subRows.length > 0 ? (
        <>
          {row.getIsExpanded() ? (
            <div className="line line-start" style={{ transform: `translateX(${row.depth * 40}px)` }} />
          ) : null}
          <Button
            variant="function"
            icon={row.getIsExpanded() ? 'open' : 'close'}
            className={classNames('me-3', 'btn-table-tree', { 'text-muted': row.getIsExpanded() })}
            onClick={row.getToggleExpandedHandler()}
            // style={{ transform: `translateX(${row.depth * 40}px)` }}
            // disabled={row.subRows.length < 1}
          />
        </>
      ) : null}
      <div className="ms-auto">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
    </div>
  );
}

function TanStackTable<TData extends { children: TData[] }>({
  data,
  columns,
  pagination,
  columnVisibility: columnVisibilityProp,
  columnOrder: columnOrderProp,
  onSortAsc,
  onSortDesc,
  onChangeColumnVisibility,
  onChangeColumnOrder,
}: TanStackTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});
  //* Two state 'onChange' || 'onEnd'
  //* 'onChange' - resizing while mouse is moving
  //* 'onEnd' - resize after mouse stop moving
  //* 'onEnd' set by default, unlike 'onChange' does not lag, since resizing occurs once
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');
  const [activeColumnId, setActiveColumnId] = useState<string>();
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>();

  const [showRowOverlay, setShowRowOverlay] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState<HTMLElement | null>(null);

  const containerRef = useRef(null);
  const tHeadRef = useRef(null);

  useRootClose(tHeadRef, () => {
    setActiveColumnId('');
  });

  const table = useReactTable<TData>({
    data,
    columns,
    state: { expanded, columnVisibility, columnOrder },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    getExpandedRowModel: getExpandedRowModel(),
    columnResizeMode,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: (p) => setColumnOrder(p as string[]),
    getCoreRowModel: getCoreRowModel(),
  });

  useLayoutEffect(() => {
    if (!columnVisibilityProp) return;

    const savedColumnSettings = columnVisibilityProp.reduce((acc, current) => {
      acc[current] = true;
      return acc;
    }, {} as VisibilityState);

    const visibilityState = table.getAllLeafColumns().reduce((acc, col) => {
      acc[col.id] = Boolean(savedColumnSettings[col.id]);
      return acc;
    }, {} as VisibilityState);

    table.setColumnVisibility(visibilityState);
  }, [table, columnVisibilityProp]);

  useLayoutEffect(() => {
    if (!columnOrderProp) return;

    table.setColumnOrder(columnOrderProp);
  }, [table, columnOrderProp]);

  useEffect(() => {
    if (!onChangeColumnVisibility) return;

    const arr = Object.entries(columnVisibility)
      .filter(([_, v]) => v)
      .map(([k, _]) => k);
    if (arr.length < 1) return;

    onChangeColumnVisibility(arr);
  }, [onChangeColumnVisibility, columnVisibility]);

  useEffect(() => {
    columnOrder && onChangeColumnOrder && onChangeColumnOrder(columnOrder);
  }, [onChangeColumnOrder, columnOrder]);

  const visibleColumnsCount = table.getVisibleLeafColumns().length;

  const activeLeafIds = activeColumnId
    ? table
        .getColumn(activeColumnId)
        .getLeafColumns()
        .map((col) => col.id)
    : [];

  const maxDepth = calculateDepth(table.getRowModel().rows);
  const expandSize = maxDepth * 40; // expanderSize

  return (
    <div ref={containerRef}>
      <table
        className="table skdf table-sticky-header table-hover"
        style={{ width: table.getCenterTotalSize() + expandSize }}
      >
        <DndProvider backend={HTML5Backend}>
          <thead ref={tHeadRef}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ height: '32px' }}>
                {headerGroup.headers.map((header, index) => {
                  const className = header.column.columnDef.meta?.headerClassName;

                  if (header.isPlaceholder) return <th key={header.id}></th>;

                  if (header.column.columnDef.meta?.settingsColumn) {
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        style={{ width: header.getSize() + expandSize }}
                        className={className}
                      >
                        <Training id="registry" step={0}>
                          <ColumnsSettingsOverlay context={header.getContext()} />
                        </Training>
                      </th>
                    );
                  }

                  // isGroup
                  if (header.column.columns.length > 0) {
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        style={{ width: header.getSize() }}
                        className={classNames('pb-0 text-nowrap', className)}
                        colSpan={header.colSpan}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  }

                  return (
                    <DraggableColumnHeader
                      key={header.id}
                      index={index}
                      header={header}
                      activeLeafIds={activeLeafIds}
                      onColumnClick={setActiveColumnId}
                      className={className}
                      onDropdownBtnClick={(event) => {
                        event.stopPropagation();
                        if (event.currentTarget === overlayTarget || overlayTarget === null)
                          setShowRowOverlay((showOverlay) => !showOverlay);
                        if (event.currentTarget !== overlayTarget) setShowRowOverlay(true);

                        setOverlayTarget(event.currentTarget);
                        setActiveColumnId(header.column.id);
                      }}
                    />
                  );
                })}
              </tr>
            ))}
          </thead>
        </DndProvider>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => {
            const nextRow = table.getRowModel().rows[rowIndex + 1];
            const isNotLast =
              nextRow &&
              ((row.depth > 0 && nextRow.depth > 0) || (row.subRows.length > 0 && nextRow.depth > row.depth));

            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={classNames(cell.column.columnDef.meta?.className, {
                      'table-focus': activeLeafIds.includes(cell.column.id),
                      'border-0': isNotLast,
                    })}
                  >
                    {cell.column.columnDef.meta?.settingsColumn ? (
                      <DotLine cell={cell} nextRow={nextRow} />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                    {/*<span className="d-inline-block me-3" style={{ width: 24, height: 24 }}></span>*/}
                    {/*{flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        {pagination && (
          <tfoot>
            <tr>
              <td colSpan={visibleColumnsCount}>{pagination}</td>
            </tr>
          </tfoot>
        )}
      </table>
      {activeColumnId ? (
        <RowSettingsOverlay
          show={showRowOverlay}
          onHide={() => setShowRowOverlay(false)}
          target={overlayTarget}
          container={containerRef}
          canHideColumn={table.getColumn(activeColumnId).getCanHide()}
          onClickHideColumn={() => {
            setShowRowOverlay(false);
            table.getColumn(activeColumnId).toggleVisibility(false);
          }}
          onClickSortAsc={() => {
            setShowRowOverlay(false);
            onSortAsc && onSortAsc(table.getColumn(activeColumnId).id);
          }}
          onClickSortDesc={() => {
            setShowRowOverlay(false);
            onSortDesc && onSortDesc(table.getColumn(activeColumnId).id);
          }}
        />
      ) : null}
    </div>
  );
}

export default TanStackTable;
