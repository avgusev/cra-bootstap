import type { TemplateUnion } from '../templates';
import type { FieldRecord } from '../templates/types';

import { templatesDict } from '../templates';

type BodyProps = {
  template: TemplateUnion;
  fields: FieldRecord | null;
};

function Body({ template, fields }: BodyProps) {
  if (!fields) return <></>;

  const BodyComponent = templatesDict[template].Body;

  return <BodyComponent fields={fields} />;
}

export default Body;
