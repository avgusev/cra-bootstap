import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import type { Field as IField } from '../../DetailedView/types';

import Field from '../components/Field';

type Props = {
  fields: Record<string, IField>;
};

function Header({ fields }: Props) {
  const { FULL_NAME, SHORT_NAME } = fields;

  return (
    <div className="d-flex gap-3">
      {typeof FULL_NAME.val === 'string' && typeof SHORT_NAME.val === 'string' ? (
        <>
          <Avatar size={48} name={FULL_NAME.val} className="rounded-1" />

          <section>
            <h3 className="mb-0">{FULL_NAME.val}</h3>
            <small className="text-caption">{SHORT_NAME.val}</small>
          </section>
        </>
      ) : (
        <section>
          <h3 className="mb-0">Нет данных</h3>
        </section>
      )}
    </div>
  );
}

function Footer({ fields }: Props) {
  return (
    <>
      <Button variant="ghost" className="px-0" icon="text_version" children="В карточку организации" disabled />
      {/*
        <Link className="py-2.5 d-inline-flex gap-2 disabled" to={`/contacts/org/${ownerId}`}>
          <SkdfIcon name="text_version" />В карточку организации
        </Link>
      */}
    </>
  );
}

function Body({ fields }: Props) {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-lg-4">
          <Field fields={[fields['INN'], fields['KPP']]} />
        </div>
        <div className="col-lg-4">
          <Field fields={[fields['TELEPHONE_NUMBER']]} />
        </div>
        <div className="col-lg-4">
          <Field fields={[fields['WEBSITE']]} type={'link'} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-8">
          <Field fields={[fields['ADRESS_POST']]} />
        </div>
        <div className="col-lg-4">
          <Field fields={[fields['EMAIL']]} type={'mail'} />
        </div>
      </div>
    </div>
  );
}

export const OrganizationTemplate = {
  Header,
  Footer,
  Body,
};
