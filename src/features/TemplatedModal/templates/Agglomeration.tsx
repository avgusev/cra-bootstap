import type { Field as IField } from '../../DetailedView/types';

import Field from '../components/Field';

type Props = {
  fields: Record<string, IField>;
};

function Header({ fields }: Props) {
  return (
    <div className="d-flex gap-3">
      <section>
        <h3 className="mb-0">Агломерация</h3>
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
          <Field fields={[fields['SUBJECT_CODE']]} />
        </div>
        <div className="col-lg-6">
          <Field fields={[fields['COUNT_ROAD']]} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-6">
          <Field fields={[fields['ROAD_LENGTH']]} />
        </div>
        <div className="col-lg-6">
          <Field fields={[fields['COUNT_EVENT']]} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-6">
          <Field fields={[fields['COUNT_BRIDGE']]} />
        </div>
      </div>
    </div>
  );
}

export const AgglomerationTemplate = {
  Header,
  Footer,
  Body,
};
