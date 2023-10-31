import Button from '../../components/Button';
import FilterButton from '../../components/FilterButton';

function RoadsHeader() {
  return (
    <div className="p-4">
      <div className="d-lg-flex align-items-start mb-4">
        <h1 className="mb-2 mb-lg-0 me-2 flex-grow-1">Дороги</h1>
        <input
          type="search"
          placeholder="Поиск по названию, идентификационному или учётному номеру"
          className="form-control mb-2 mb-lg-0 me-2 flex-grow-1"
          style={{ maxWidth: '38rem' }}
        />
        <FilterButton count={99} className="me-2" />
        <Button variant="stroke" className="flex-shrink-0" icon="question" children="Помощь" />
      </div>

      <div className="d-flex flex-wrap align-items-center gap-2">
        <span className="me-3">
          <span className="text-nowrap">797 656</span> дорог общей протяжённостью{' '}
          <span className="text-nowrap">1 309 096,069 км</span>
        </span>
        <div className="d-sm-flex me-auto">
          <Button className="me-4" variant="function" icon="info" />
          <Button
            variant="function"
            icon="list_on_map"
            className="me-auto flex-shrink-0"
            children="Показать на карте"
          />
        </div>
        <div className="d-sm-flex">
          <Button variant="function" icon="download" className="me-4" children="Экспорт" />
          <Button variant="function" icon="task" className="me-4" children="Отчеты" />
          <Button variant="function" icon="terms" children="Постановление" />
        </div>
      </div>
    </div>
  );
}

export default RoadsHeader;
