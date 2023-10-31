import { GoBack } from '.';
import Button from '../../components/Button';

function RoadCardHeaderEdit() {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <h1 className="mb-0 flex-grow-1">М-10 "Россия" Москва - Тверь - Великий Новгород - Санкт-Петербург</h1>
        <Button variant="stroke" icon="question" className="flex-shrink-0" children="Помощь" />
      </div>
      <GoBack href="#" text="В режим просмотра" />
    </div>
  );
}

export default RoadCardHeaderEdit;
