import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import SkdfIcon from '../../../components/SkdfIcon';
import Button from '../../../components/Button';
import CheckStatus from '../../../components/CheckStatus';

import type { Field } from '../../../features/DetailedView/types';
// import Training from '../../../features/Training';
import { trainingStore } from '../../../features/Training/store';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type HeaderProps = {
  id: string | undefined;
  fields: Record<string, Field>;
};

function Header({ id, fields }: HeaderProps) {
  const roadValue =
    (fields &&
      Array.isArray(fields?.ROAD?.value.value) &&
      (fields?.ROAD?.value.value[0] as { id: string; text: string })) ||
    null;
  return (
    <header className="p-4">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <h1 title={id ? id.toString() : ''}>{fields && typeof roadValue?.text === 'string' ? roadValue?.text : ' '}</h1>
        <Button
          variant="stroke"
          icon="question"
          className="flex-shrink-0"
          children="Помощь"
          onClick={() =>
            trainingStore.showTrening('passport', {
              steps: [
                {
                  title: 'Поиск по характеристикам',
                  text: 'Воспользуйтесь поиском по характеристикам.',
                },
                {
                  title: 'Все доступные характеристики',
                  text: 'Используйте оглавление для быстрого просмотра паспорта и перемещения между характеристиками.',
                },
              ],
            })
          }
        />
      </div>
      <nav>
        <ol className="breadcrumb mb-0 mt-1">
          <li className="breadcrumb-item">
            <Link to={`/roads`}>
              <SkdfIcon name="arrow-left" width={16} height={16} />К списку дорог
            </Link>
          </li>
        </ol>
      </nav>
      <div className="d-sm-flex flex-wrap align-items-center gap-2 mt-4">
        <div className="d-sm-flex me-auto">
          {fields && fields.PLAN_FACT && (
            <OverlayTrigger
              placement="bottom-start"
              popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [0, 4] } }] }}
              overlay={
                <Tooltip>
                  <div>
                    <div>Дата начала: {String(fields.DATE_START.val || '-')}</div>
                    <div>Дата окончания: {String(fields.DATE_FINISH.val || '-')}</div>
                  </div>
                </Tooltip>
              }
            >
              <div>
                <CheckStatus fields={fields} value={['Проведена', 'Планируется']} />
              </div>
            </OverlayTrigger>
          )}
        </div>
        <div className="d-sm-flex">
          <Button variant="function" icon="printer" className="me-4" children="Печать" onClick={() => window.print()} />
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
