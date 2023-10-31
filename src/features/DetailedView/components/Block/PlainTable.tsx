import { observer } from 'mobx-react-lite';
import { OverlayTrigger, Dropdown } from 'react-bootstrap';
import { OverlayInjectedProps } from 'react-bootstrap/esm/Overlay';
import { nanoid } from 'nanoid';

import Button from '../../../../components/Button';

import type { BlockResponse, BlockStore } from '../../types';
import FieldWithWrappers from './FieldWithWrappers';
import SkdfIcon from '../../../../components/SkdfIcon';
import type { EditFieldModalStore } from '../../store';

type PlainTableProps = {
  metadata: BlockResponse['metadata'];
  // data?: Record<string, string | number | boolean | undefined>[];
  // @TODO narrow type (see: https://git.stdev.ru/skdf/kraken/skdf.portal.ui/-/blob/master/src/api/dto/common.ts#L34)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  block?: BlockStore;
  editMode: boolean;
  editFieldModalStore?: EditFieldModalStore;
};

const calcWidth = (str: string) => `${Math.max(Math.ceil(str.length * 0.58) + 1, 10)}rem`;

function PlainTableHeader({ metadata, editMode }: { metadata: PlainTableProps['metadata']; editMode: boolean }) {
  const parentColumns = metadata.filter((v) => Object.hasOwn(v, 'children')).map((v) => v.id);

  return (
    <>
      <tr>
        {editMode ? <th scope="col" colSpan={1} rowSpan={1} style={{ width: '2rem' }}></th> : null}
        {metadata.map((item) => (
          <th
            key={item.code === 'BLANK' ? nanoid() : item.code}
            scope="col"
            style={{ width: item.width ?? calcWidth(item.title || '') }}
            rowSpan={parentColumns.length && !item.children?.length ? 2 : 1}
            colSpan={item.children?.length ?? 1}
            title={item.titleHint || undefined}
          >
            {item.title}
          </th>
        ))}
      </tr>
      {parentColumns.length ? (
        <tr>
          {metadata.map((item) => {
            return item.children?.length
              ? item.children.map((child) => (
                  <th
                    key={child.code === 'BLANK' ? nanoid() : child.code}
                    scope="col"
                    style={{ width: child.width ?? calcWidth(child.title || '') }}
                  >
                    {child.title}
                  </th>
                ))
              : null;
          })}
        </tr>
      ) : null}
    </>
  );
}

function PlainTable({ metadata, data, editMode, block, editFieldModalStore }: PlainTableProps) {
  return (
    <table className="table skdf table-hover table-sticky-header" style={{ tableLayout: 'fixed' }}>
      <thead>
        <PlainTableHeader editMode={editMode} metadata={metadata} />
      </thead>
      <tbody>
        {data
          .filter((row) => !row.isDeleted)
          .map((row, index) => (
            <tr key={row.hash || index}>
              {editMode && block ? (
                <td>
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
                      <div className="dropdown-menu" {...props} style={{ width: '17.375rem', ...props.style }}>
                        <Dropdown.Item
                          as="button"
                          onClick={() => editFieldModalStore?.openModal(block.name, false, block, row.id)}
                        >
                          <SkdfIcon name="edit" />
                          Редактировать
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => block.removeItem(index)}>
                          <SkdfIcon name="trash" />
                          Удалить
                        </Dropdown.Item>
                      </div>
                    )}
                  >
                    <Button variant="function" icon="more_vertical" />
                  </OverlayTrigger>
                </td>
              ) : null}
              {metadata.map((item) =>
                !item.children?.length ? (
                  <td key={item.code === 'BLANK' ? nanoid() : item.code}>
                    <FieldWithWrappers
                      fieldKey={item.name}
                      type={item.type}
                      externalKey={item.externalKey}
                      hasDate={item.hasDate}
                      row={row}
                    />
                  </td>
                ) : (
                  item.children.map((child) => (
                    <td key={child.code === 'BLANK' ? nanoid() : child.code}>
                      <FieldWithWrappers
                        fieldKey={child.name}
                        type={item.type}
                        externalKey={child.externalKey}
                        hasDate={child.hasDate}
                        row={row}
                      />
                    </td>
                  ))
                )
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default observer(PlainTable);
