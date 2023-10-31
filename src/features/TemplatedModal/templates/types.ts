import type { Field as IField } from '../../DetailedView/types';
import type { TemplateUnion } from './';

export type FieldRecord = Record<string, IField>;

type TemplateElementProps = {
  fields: FieldRecord;
};

type TemplateElement = 'Body' | 'Header' | 'Footer';
type Template = Record<TemplateElement, (props: TemplateElementProps) => JSX.Element>;
export type TemplateDict = Record<TemplateUnion, Template>;
