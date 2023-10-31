import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import SkdfIcon from '../../../components/SkdfIcon';
import Button from '../../../components/Button';
import CheckStatus from '../../../components/CheckStatus';

import type { Field } from '../../../features/DetailedView/types';
import { userStoreInstance } from '../../../features/Auth/store';
import { trainingStore } from '../../../features/Training/store';
import Training from '../../../features/Training';
import { roadStoreInstance } from '../store';

type HeaderProps = {
  id: string | undefined;
  fields: Record<string, Field>;
};

function Header({ id, fields }: HeaderProps) {
  const { canEdit, toggleEditMode, toggleHistoryOfChangesModal, editMode } = roadStoreInstance;

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
            userStoreInstance.isSignedIn
              ? trainingStore.showTrening('passport')
              : trainingStore.showTrening('passport', {
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
      {!editMode ? (
        <>
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
              {userStoreInstance.isSignedIn && (
                <>
                  {fields && fields.IS_CHECKED && (
                    <Training id="passport" step={2} className="me-4">
                      <CheckStatus fields={fields} />
                    </Training>
                  )}
                  {id && (
                    <Button
                      variant="function"
                      icon="history"
                      className="me-4"
                      children="История"
                      onClick={() => {
                        toggleHistoryOfChangesModal(id.toString());
                      }}
                    />
                  )}
                  <Button
                    disabled={!canEdit}
                    variant="function"
                    icon="edit"
                    className="me-4"
                    children="Редактировать"
                    onClick={toggleEditMode}
                  />
                </>
              )}
            </div>
            <div className="d-sm-flex">
              <Button
                variant="function"
                icon="printer"
                className="me-4"
                children="Печать"
                onClick={() => window.print()}
              />
              {/*{userStoreInstance.isSignedIn && (*/}
              {/*  <Button disabled variant="function" icon="file-text" className="me-4" children="Выписка" />*/}
              {/*)}*/}
              {/*<Button disabled variant="function" icon="network" children="Связи" />*/}
            </div>
          </div>
        </>
      ) : (
        <nav>
          <ol className="breadcrumb mb-0 mt-1">
            <li className="breadcrumb-item">
              <Button variant="function" onClick={toggleEditMode}>
                <SkdfIcon name="arrow-left" width={16} height={16} />В режим просмотра
              </Button>
            </li>
          </ol>
        </nav>
      )}
    </header>
  );
}

export default observer(Header);
