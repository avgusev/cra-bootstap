import type { Field as IField } from '../../DetailedView/types';

import Field from '../components/Field';

type Props = {
  fields: Record<string, IField>;
};

function Header({ fields }: Props) {
  return (
    <div className="d-flex gap-3">
      <section>
        <h3 className="mb-0">Фотовидеофиксация нарушений</h3>
      </section>
    </div>
  );
}

function Footer({ fields }: Props) {
  return <></>;
}

function Body({ fields }: Props) {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-lg-6">
          <Field fields={[fields['checkDate']]} />
        </div>
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Марка/Модель</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Реестровый номер свидетельства о проверке</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Зона контроля: Метров</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Зона контроля: Число полос</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Виды фиксируемых нарушений ПДД</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Максимальная фиксируемая скорость, км/ч</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Фиксация антирадаром</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Место установки</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-3">
            <div className="form-label">Вид опоры</div>
            <span className="text-muted">нет данных</span>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-6">
          <Field fields={[fields['regNum']]} />
        </div>
        <div className="col-lg-6">
          <Field fields={[fields['antiRadarFixation']]} />
        </div>
      </div>
    </div>
  );
}

export const ViolationFixationTemplate = {
  Header,
  Footer,
  Body,
};
