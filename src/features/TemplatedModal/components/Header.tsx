import type { TemplateUnion } from '../templates';
import type { FieldRecord } from '../templates/types';

import { templatesDict } from '../templates';

type HeaderProps = {
  template: TemplateUnion;
  fields: FieldRecord | null;
};

function Header({ template, fields }: HeaderProps) {
  if (!fields) return <></>;

  const HeaderComponent = templatesDict[template].Header;

  return <HeaderComponent fields={fields} />;
}

export default Header;
