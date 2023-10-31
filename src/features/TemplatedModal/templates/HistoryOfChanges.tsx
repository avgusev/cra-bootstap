import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import Avatar from '../../../components/Avatar';
import { pluralize } from '../../../utils';
import { modalStoreInstance } from '../store';

function Header() {
  const { totalCount } = modalStoreInstance;

  return (
    <div className="d-flex gap-3">
      <section>
        <h2 className="mb-0">История изменений</h2>
        {totalCount && (
          <div className="mt-4">
            {`${totalCount}`}
            {pluralize({
              count: totalCount,
              one: ' изменение',
              few: ' изменения',
              many: ' изменений',
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Footer() {
  return <></>;
}

function Body() {
  const { changeFileds } = modalStoreInstance;

  const headers: string[] = [
    'Дата и время',
    'Блок',
    'Действие',
    'Объект',
    'Характеристика',
    'Старое значение',
    'Новое значение',
    'Пользователь',
  ];

  type Change = {
    id?: string | number;
    userName?: string;
    childrenId?: number | string;
    logId?: number;
    level?: number;
    date?: Date;
    action?: number;
    block?: string;
    object?: string;
    characteristics?: string;
    newValue?: string;
    oldValue?: string;
  };

  const changes: Change[] = [];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  for (const change of changeFileds!) {
    let changeElement: Change = {};
    for (const children of change.children) {
      changeElement = { ...children, date: change.date, userName: change.user?.name, id: change.id };
      changes?.push(changeElement);
    }
  }

  function getAction(value: number | undefined) {
    switch (value) {
      case 1:
        return 'Создание обьекта';
      case 3:
        return 'Создание связи';
      case 5:
        return 'Создание атрибута';
      case 7:
        return 'Изменение атрибута';
      case 8:
        return 'Изменение обьекта';
      case undefined:
        return 'Нет данных';
    }
  }

  if (changes.length === 0) {
    return <div className="row mb-5 justify-content-center">История по данному объекту отсутствует</div>;
  }

  return (
    <>
      <table className="table skdf table-hover table-sticky-header">
        <thead>
          <tr>
            {headers.map((header, index) => {
              return (
                <th scope="col" key={index} style={{ whiteSpace: 'nowrap' }}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {changes &&
            changes.map((change) => {
              return (
                <tr key={nanoid()}>
                  <td className="text-nowrap">{`${change.date}`}</td>
                  <td>{`${change.block}`}</td>
                  <td>{`${getAction(change.action)}`}</td>
                  <td>
                    <div style={{ width: '350px' }}>{`${change.object}`}</div>
                  </td>
                  <td>
                    <div style={{ width: '200px' }}>{`${
                      change.characteristics ? change.characteristics : 'Нет данных'
                    }`}</div>
                  </td>
                  <td>{`${change.oldValue ? change.oldValue : 'Нет данных'}`}</td>
                  <td>{`${change.newValue ? change.newValue : 'Нет данных'}`}</td>
                  <td>
                    {change && change.userName && change.userName.length > 0 ? (
                      <>
                        <Avatar size={24} name={change.userName} className="rounded-2" />
                        {` ${change.userName}`}
                      </>
                    ) : (
                      'Нет данных'
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export const HistoryOfChangesTemplate = {
  Header: observer(Header),
  Footer,
  Body: observer(Body),
};
