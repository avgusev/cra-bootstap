import Button from '../../components/Button';
import CheckStatus from '../../components/CheckStatus';
import { GoBack } from '.';

function RoadCardHeader() {
  const fields = {};
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <h1 className="mb-0 flex-grow-1">М-10 "Россия" Москва - Тверь - Великий Новгород - Санкт-Петербург</h1>
        <Button variant="stroke" icon="question" className="flex-shrink-0" children="Помощь" />
      </div>
      <GoBack href="#" text="К списку дорог" />

      <div className="d-sm-flex flex-wrap align-items-center gap-2 mt-4">
        <div className="d-sm-flex me-auto">
          <CheckStatus fields={fields} className="me-4" />
          <Button variant="function" icon="history" className="me-4" children="История" />
          <Button variant="function" icon="edit" className="me-4" children="Редактировать" />
        </div>
        <div className="d-sm-flex">
          <Button variant="function" icon="printer" className="me-4" children="Печать" />
          <Button variant="function" icon="file-text" className="me-4" children="Выписка" />
          <Button variant="function" icon="network" children="Связи" />
        </div>
      </div>
    </div>
  );
}

export default RoadCardHeader;
