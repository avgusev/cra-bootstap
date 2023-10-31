import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import SkdfIcon from '../../../components/SkdfIcon';
import Button from '../../../components/Button';
import CheckStatus from '../../../components/CheckStatus';

import type { Field } from '../../../features/DetailedView/types';
import Training from '../../../features/Training';
import { trainingStore } from '../../../features/Training/store';

type HeaderProps = {
  id: string | undefined;
  fields: Record<string, Field>;
};

function Header({ id, fields }: HeaderProps) {
  return (
    <header className="p-4">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <h1 title={id ? id.toString() : ''}>
          {fields && typeof fields?.FULL_NAME?.val === 'string' ? fields?.FULL_NAME?.val : ' '}
        </h1>
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
      {/* <h4>SubTitle</h4> */}
      <nav>
        <ol className="breadcrumb mb-0 mt-1">
          <li className="breadcrumb-item">
            <Link to="/roads">
              <SkdfIcon name="arrow-left" width={16} height={16} />К списку дорог
            </Link>
          </li>
        </ol>
      </nav>
      <div className="d-sm-flex flex-wrap align-items-center gap-2 mt-4">
        <div className="d-sm-flex me-auto">
          {fields && fields.IS_CHECKED && (
            <Training id="passport" step={2} className="me-4">
              <CheckStatus fields={fields} />
            </Training>
          )}
          <Button disabled variant="function" icon="history" className="me-4" children="История" />
          {/* <Button disabled variant="function" icon="edit" className="me-4" children="Редактировать" /> */}
        </div>
        <div className="d-sm-flex">
          <Button variant="function" icon="printer" className="me-4" children="Печать" onClick={() => window.print()} />
          <Button disabled variant="function" icon="file-text" className="me-4" children="Выписка" />
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
