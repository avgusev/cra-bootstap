import type { Field as IField } from '../../DetailedView/types';

import Field from '../components/Field';

type Props = {
  fields: Record<string, IField>;
};

function Header({ fields }: Props) {
  return (
    <div className="d-flex gap-3">
      <section>
        <h3 className="mb-0">{typeof fields.NAME.val === 'string' ? fields.NAME.val : 'Нет данных'}</h3>
      </section>
    </div>
  );
}

function Footer({ fields }: Props) {
  return <></>;
}

function Body({ fields }: Props) {
  return (
    <>
      <div className="container-fluid px-0">
        <div className="row">
          <h4 className="mb-0">Количество дорог в субъекте</h4>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Field fields={[fields['FEDERAL_COUNT']]} />
          </div>
          <div className="col-lg-6">
            <Field fields={[fields['REGIONAL_COUNT']]} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg-6">
            <Field fields={[fields['LOCAL_COUNT']]} />
          </div>
        </div>
      </div>
      <div className="container-fluid px-0 mt-4">
        <div className="row">
          <h4 className="mb-0">Протяженность дорог в субъекте, км</h4>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Field fields={[fields['FEDERAL_LENGTH']]} />
          </div>
          <div className="col-lg-6">
            <Field fields={[fields['REGIONAL_LENGTH']]} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg-6">
            <Field fields={[fields['LOCAL_LENGTH']]} />
          </div>
        </div>
      </div>
    </>
  );
}

export const RegionTemplate = {
  Header,
  Footer,
  Body,
};
