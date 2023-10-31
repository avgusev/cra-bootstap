import type { TemplateUnion } from '../templates';
import type { FieldRecord } from '../templates/types';

import { templatesDict } from '../templates';

type FooterProps = {
  template: TemplateUnion;
  fields: FieldRecord | null;
};

function Footer({ template, fields }: FooterProps) {
  if (!fields) return <></>;

  const FooterComponent = templatesDict[template].Footer;

  return <FooterComponent fields={fields} />;
}

export default Footer;
