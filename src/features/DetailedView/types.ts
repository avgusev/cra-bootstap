import { Image } from './index';
import type { EditFieldModalStore } from './store';

export interface DetailedViewStore {
  editFieldModalStore: EditFieldModalStore;

  id: number | null;
  hash: string | null;
  isAuthor: boolean;
  hasGeometry: boolean;
  fetchState: FetchStateUnion;
  _fields: FieldStore[];
  _visibleBlocks: VisibleBlock[];
  nav: Record<string, Section>;

  navigationTemplate: NavigationStruct;
  meta: Meta;
  editMode: boolean;
  isChanged: boolean;

  images?: Image[];
  changeFields?: ChangeElementInfo[];

  /**
   * Returns record of field stores
   *
   */
  fields: Record<string, FieldStore>;

  /**
   * Returns common sectiion
   *
   */
  commonSection: Section;

  /**
   * Returns sections
   *
   */
  sections: Record<string, Section>;

  /**
   * Returns all blocks
   *
   */
  blocks: BlockStore[];

  /**
   * Returns sections
   *
   */
  saveEndpoints: string[];

  /**
   * Returns `true` if current user can edit entity
   *
   */
  canEdit: boolean;

  /**
   * Toggle edit mode if current user can edit entity
   *
   */
  toggleEditMode: () => void;

  /**
   * On change values callback
   *
   */
  onChangeValues: () => void;

  /**
   * Changes values in block of section with `common` key.
   * Mostly uses for change `isOpen` value
   *
   * @param index - index of block in common section
   * @param param - fields to change
   *
   */
  updateCommonSectionBlockFields: (index: number, param: Partial<Block>) => void;

  /**
   * Changes values in block of section.
   * Mostly uses for change `isOpen` value
   *
   * @param key - key of section
   * @param index - index of block in section
   * @param param - fields to change
   *
   */
  updateBlockFields: (key: string, index: number, param: Partial<Block>) => void;

  /**
   * Updates block state and fetch block data if necessary
   *
   * @param key - Block id
   * @param index - Block id
   * @param isOpen - Block state
   * @param block - Block
   *
   * @virtual
   */
  updateBlock: (key: string, index: number, isOpen: boolean | undefined, block: Block) => void;

  /**
   * Updates entity in store.
   *
   * @param data - Entity fields
   *
   */
  updateEntity: (data: CommonInfo) => void;

  /**
   * Fetches entity from API.
   *
   * @param id - Entity id
   *
   * @virtual
   */
  fetchEntity: (id: number | string) => void;

  /**
   * Saves entity
   *
   * @virtual
   */
  saveEntity: () => Promise<void>;
}

export interface FieldStore extends ResponseField {
  value: FieldValue;

  isCustom: boolean;
  id: number;
  code: string;
  type: number;
  isMultiple: boolean;
  isRequired: boolean;
  isReadonly: boolean;
  isEntity: boolean;
  isPaged?: boolean;
  title?: string;
  errorMessage?: string;
  /**
   * Getter and setter for value.value
   */
  val: FieldValue['value'];

  /**
   * Update field value
   */
  updateValue: (value: FieldValue['value']) => void;

  /**
   * Returns plain object
   */
  toJSON: () => ResponseField;
}

export type FetchStateUnion = 'pending' | 'done' | 'error';

export interface CommonInfo {
  visibleBlocks: VisibleBlock[];
  directionOfTravel: DirectionOfTravel[];
  hasGeometry: boolean;
  id: number;
  hash: string;
  isAuthor: boolean;
  fields: ResponseField[];
}

export interface DirectionOfTravel {
  id: number;
  code: string;
  text: string;
  isNew: boolean;
  isDeleted: boolean;
}

export interface ResponseField {
  value: FieldValue;
  isCustom: boolean;
  id: number;
  code: string;
  type: number;
  isMultiple: boolean;
  isRequired: boolean;
  isReadonly: boolean;
  isEntity: boolean;
  isPaged?: boolean;
  title?: string;
}

export interface FieldValue {
  isChanged: boolean;
  value?: ValueElement[] | boolean | number | string;
}

export interface Field extends ResponseField {
  val?: FieldValue['value'];
}

export interface EntityResponse {
  filters: unknown[];
  start: number;
  limit: number;
  totalCount: number;
  data: ValueElement[];
}

export interface HistoryOfChangesResponse {
  filters: unknown[];
  start: number;
  totalCount: number;
  totalGroupCount: number;
  data: ChangeElementInfo[];
}

export interface ValueElement {
  id: number | string;
  code?: string;
  text?: string;
  isNew: boolean;
  isDeleted: boolean;
  hash?: string;
  storageFileId?: string;
  name?: string;
  // @TODO narrow type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

export interface ChangeElementInfo {
  id: number | string;
  logId: number;
  level: number;
  date: Date;
  source: {
    id: number;
  };
  user: {
    id: number;
    name: string;
  };
  children: ChangeElement[];
}

export interface ChangeElement {
  id: number | string;
  logId: number;
  level: number;
  date: Date;
  action: number;
  block: string;
  object: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[];
}

export interface VisibleBlock {
  id: number;
  itemCount: number;
}

export interface BlockMetadata {
  id: number;
  name: string;
  code: string;
  externalKey?: string;
  type:
    | 'map'
    | 'string'
    | 'number'
    | 'owner'
    | 'date'
    | 'file'
    | 'files'
    | 'array'
    | 'boolean'
    | 'location'
    | 'roadLink'
    | 'bridgeLink'
    | 'roadStartBackboneNetwork'
    | 'roadFinishBackboneNetwork'
    | 'roadStartDiagnostics'
    | 'roadFinishDiagnostics'
    | 'roadStartSectionLink'
    | 'roadFinishSectionLink'
    | 'estimate'
    | 'agglomeration'
    | 'region'
    | 'violationFixation';
  title: string;
  titleHint?: string;
  width?: string;
  hasDate?: boolean;
  children?: BlockMetadata[];
  isEntity?: boolean;
  isMultiple?: boolean;
  isRequired?: boolean;
}

export interface BlockResponse {
  start: number;
  limit: number;
  totalCount: number;
  metadata: BlockMetadata[];
  defaultMetadata?: BlockMetadata[];
  data: Record<string, unknown>[];
}

export interface Block {
  id: number;
  name: string;
  endpoint: string;
  saveEndpoint?: string;
  data?: BlockResponse;
  itemCount?: number;
  isLoading?: boolean;
  isOpen?: boolean;
}

export interface BlockStore {
  id: number;
  name: string;
  endpoint: string;
  saveEndpoint?: string;
  data?: BlockResponse;
  itemCount?: number;
  isLoading?: boolean;
  isOpen?: boolean;

  removeItem: (index: number) => void;
  updateParams: (params: Partial<Block>) => void;
}

export interface Section {
  id: string;
  name: string;
  blocks: BlockStore[];
}

export interface NavigationBlock {
  id: number;
  name: string;
  endpoint: string;
  saveEndpoint?: string;
}

export interface NavigationElement {
  id: string;
  name: string;
  blocks: NavigationBlock[];
}

export type NavigationStruct = Record<string, NavigationElement>;

export type NavigationKeys = (keyof NavigationStruct)[];

export type Meta = Record<string, BlockMetadata[]>;

export interface CardField {
  title: string;
  code: string | string[];
  className?: string;
  type?: string;
}

export type CardRow = CardField[];

export type CardBlock = CardRow[];

export type CardList = CardBlock[];

export type FileDescriptor = {
  id: string;
  name: string;
  contentType: string;
  previewId: string;
};

export type FileShortDescriptor = {
  id: string;
  name: string;
  hasPreview: boolean;
};

export interface OrganizationMiniPassport {
  accessLevel: number;
  fields: ResponseField[];
  id: number;
}

export interface AgglomerationMiniPassport {
  accessLevel: number;
  fields: ResponseField[];
  id: number;
}

export interface RegionMiniPassport {
  accessLevel: number;
  fields: ResponseField[];
  id: number;
}

export type SaveStruct = {
  id: number;
  hash: string;
  fields: ResponseField[];
};

export type SaveProfile = {
  fields: ResponseField[];
};

export interface SaveResponse {
  isSuccess: boolean;
  id: number;
  errors: never[];
}
