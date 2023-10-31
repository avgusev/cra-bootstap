import { observer } from 'mobx-react-lite';
import type { Field as IField } from '../../DetailedView/types';

// import { bridgeStoreInstance } from '../../../pages/BridgePage/store';

type Props = {
  fields: Record<string, IField>;
};

function Header({ fields }: Props) {
  return (
    <div className="d-flex gap-3">
      <section>
        <h3 className="mb-0">Все показатели оценки технического состояния от</h3>
      </section>
    </div>
  );
}

function Body({ fields }: Props) {
  return (
    <div className="container-fluid px-0">
      <div className="table-responsive" style={{ maxHeight: '30rem' }}>
        <table className="table skdf table-hover table-sticky-header" style={{ tableLayout: 'fixed' }}>
          <tbody>
            {JSON.stringify(fields)}
            {/* {dataInfo.map((row, index) => (
              <tr key={index}>
                {metaInfo.map((item) =>
                  !item.children?.length ? (
                    <td key={item.code === 'BLANK' ? nanoid() : item.code}>
                      <FieldWithWrappers fieldKey={item.name} type={item.type} hasDate={item.hasDate} row={row} />
                    </td>
                  ) : (
                    item.children.map((child) => (
                      <td key={child.code === 'BLANK' ? nanoid() : child.code}>
                        <FieldWithWrappers fieldKey={child.name} type={item.type} hasDate={child.hasDate} row={row} />
                      </td>
                    ))
                  )
                )}
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Footer({ fields }: Props) {
  return <></>;
}

export const EstimateTemplate = {
  Header,
  Footer,
  Body: observer(Body),
};
