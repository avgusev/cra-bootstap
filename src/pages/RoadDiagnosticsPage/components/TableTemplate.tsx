/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValue } from '../../../features/DetailedView/components/CommonBlock/FieldValue';
import { FieldStore } from '../../../features/DetailedView/types';
import { IItem } from '../meta';

function TableTemplate(props: any) {
  const fields = props[0];
  const parentColumns = props.columns.filter((v: IItem) => Object.hasOwn(v, 'children')).map((v: IItem) => v.title);

  return (
    <table className="table skdf table-hover table-sticky-header" style={{ tableLayout: 'fixed' }}>
      <thead>
        <tr>
          {props.columns.map((column: IItem, index: number) => (
            <th
              key={index}
              rowSpan={parentColumns.length && !column.children?.length ? 2 : 1}
              colSpan={column.children?.length ?? 1}
            >
              {column.title}
            </th>
          ))}
        </tr>
        {parentColumns.length ? (
          <tr>
            {props.columns.map((item: IItem) => {
              return item.children?.length
                ? item.children.map((child, index) => (
                    <th key={index} scope="col">
                      {child.title}
                    </th>
                  ))
                : null;
            })}
          </tr>
        ) : null}
      </thead>
      <tbody>
        <tr>
          {props.columns.map((field: IItem, index: number) =>
            field.children && Array.isArray(field.children) ? (
              field.children.map((chld, index) => (
                <td key={index}>
                  {fields[String(field.dataIndex)].map((item: any, index: number) => (
                    <div key={index} className="d-grid">
                      <FieldValue field={{ value: { value: item[String(chld.dataIndex)] } } as FieldStore} />
                    </div>
                  ))}
                </td>
              ))
            ) : (
              <td key={index}>
                <FieldValue field={{ value: { value: fields[String(field.dataIndex)] } } as FieldStore} />
              </td>
            )
          )}
        </tr>
      </tbody>
    </table>
  );
}

export default TableTemplate;
