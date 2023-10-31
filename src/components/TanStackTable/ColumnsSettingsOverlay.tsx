import { useState } from 'react';
import { HeaderContext } from '@tanstack/react-table';
import { Form, OverlayTrigger } from 'react-bootstrap';
import { OverlayInjectedProps } from 'react-bootstrap/esm/Overlay';

import Button from '../Button';

type ColumnsSettingsOverlayProps<TData, TValue> = {
  context: HeaderContext<TData, TValue>;
};

function ColumnsSettingsOverlay<TData, TValue>({ context }: ColumnsSettingsOverlayProps<TData, TValue>) {
  const [inputText, setInputText] = useState('');

  return (
    <OverlayTrigger
      placement="bottom-start"
      popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [0, 12] } }] }}
      trigger="click"
      rootClose
      overlay={({
        popper,
        arrowProps,
        show,
        // placement,
        // scheduleUpdate,
        // outOfBoundaries,
        ...props
      }: OverlayInjectedProps) => (
        <div className="dropdown-menu" {...props} style={{ width: '21.375rem', ...props.style }}>
          <div className="mx-3 mt-2.5 mb-3">
            <Form.Control
              type="search"
              size="sm"
              value={inputText}
              placeholder="Поиск по столбцам"
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="overflow-auto pb-2.5 ps-3" style={{ maxHeight: '16.75rem' }}>
            <Form.Check
              id="checkSelect-all"
              label="Выбрать все"
              className="mb-2.5 ps-2r"
              checked={context.table.getIsAllColumnsVisible()}
              onChange={context.table.getToggleAllColumnsVisibilityHandler()}
            />
            {context.table.getAllLeafColumns().map((column) => {
              const title = column.columnDef.meta?.title || '';

              if (!title.toLowerCase().includes(inputText.toLowerCase())) {
                return null;
              }

              return (
                <Form.Check
                  key={column.id}
                  id={'checkSelect-' + column.id}
                  label={title}
                  className="mb-2.5 ps-2r"
                  checked={column.getIsVisible()}
                  disabled={!column.getCanHide()}
                  onChange={column.getToggleVisibilityHandler()}
                />
              );
            })}
          </div>
        </div>
      )}
    >
      <Button variant="function" icon="settings" />
    </OverlayTrigger>
  );
}

export default ColumnsSettingsOverlay;
