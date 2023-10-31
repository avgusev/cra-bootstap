import { FieldValue } from '../../types';

export type BlockData = {
  hasGeometry?: boolean;
  hash?: string;
  id?: number;
  isDeleted: boolean;
  isNew: boolean;
} & Record<string, FieldValue>;
