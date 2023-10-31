import type { TemplateDict } from './types';

import { AgglomerationTemplate } from './Agglomeration';
import { OrganizationTemplate } from './Organization';
import { RegionTemplate } from './Region';
import { ViolationFixationTemplate } from './ViolationFixation';
import { EstimateTemplate } from './Estimate';
import { HistoryOfChangesTemplate } from './HistoryOfChanges';

export type TemplateUnion =
  | 'organization'
  | 'agglomeration'
  | 'region'
  | 'violationFixation'
  | 'estimateInfo'
  | 'historyOfChanges';

export const templatesDict: TemplateDict = {
  organization: OrganizationTemplate,
  agglomeration: AgglomerationTemplate,
  region: RegionTemplate,
  violationFixation: ViolationFixationTemplate,
  estimateInfo: EstimateTemplate,
  historyOfChanges: HistoryOfChangesTemplate,
};
