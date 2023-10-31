import { Overlay } from 'react-bootstrap';
import { OverlayInjectedProps, OverlayProps } from 'react-bootstrap/esm/Overlay';

import Button from '../Button';

type RowSettingsOverlayProps = Omit<OverlayProps, 'children'> & {
  canHideColumn?: boolean;
  onClickHideColumn?: () => void;
  onClickSortAsc?: () => void;
  onClickSortDesc?: () => void;
  onClickSearch?: () => void;
};

function RowSettingsOverlay({
  canHideColumn,
  onClickHideColumn,
  onClickSortAsc,
  onClickSortDesc,
  onClickSearch,
  ...props
}: RowSettingsOverlayProps) {
  return (
    <Overlay
      placement="bottom-start"
      popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [0, 22] } }] }}
      rootClose
      rootCloseEvent="click"
      {...props}
    >
      {({
        placement,
        popper,
        scheduleUpdate,
        arrowProps,
        outOfBoundaries,
        show,
        style,
        ...props
      }: OverlayInjectedProps) => (
        <div className="dropdown-menu" {...props} style={{ width: '21.375rem', ...style }}>
          {canHideColumn && onClickHideColumn && (
            <>
              <Button
                className="dropdown-item rounded-0 justify-content-start text-black"
                variant="function"
                icon="eye_closed"
                children="Скрыть столбец"
                onClick={onClickHideColumn}
              />
              <hr className="dropdown-divider mx-3" />
            </>
          )}
          <Button
            className="dropdown-item rounded-0 justify-content-start  text-black"
            variant="function"
            icon="sort_desc"
            children="Сортировать по убыванию"
            onClick={() => onClickSortDesc && onClickSortDesc()}
          />
          <Button
            className="dropdown-item rounded-0 justify-content-start  text-black"
            variant="function"
            icon="sort_asc"
            children="Сортировать по возрастанию"
            onClick={() => onClickSortAsc && onClickSortAsc()}
          />
        </div>
      )}
    </Overlay>
  );
}

export default RowSettingsOverlay;
