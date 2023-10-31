import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { toJS } from 'mobx';

import MapLink from '../../../../components/MapLink';

import { formatNumber } from '../../../../utils';

import { getKey } from '../../lib/getFieldKey';
import { isObject } from '../../lib/isObject';

import Owner, { OwnerValue } from './fields/Owner';
import Agglomeration, { AgglomerationValue } from './fields/Agglomeration';
import Region, { RegionValue } from './fields/Region';
// import Estimate, { EstimateInfoValue } from './fields/Estimate';

import DownloadFile from './fields/DownloadFile';
import DownloadFiles from './fields/DownloadFiles';

import type { BlockMetadata } from '../../types';
import ViolationFixation from './fields/ViolationFixation';
import { accessMatrixStoreInstance } from '../../../AccessMatrix/store';

type FieldProps = {
  fieldKey: string;
  type: BlockMetadata['type'];
  externalKey: string | undefined;
  // @TODO narrow type (see: https://git.stdev.ru/skdf/kraken/skdf.portal.ui/-/blob/master/src/api/dto/common.ts#L34)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
};

const Field = ({ fieldKey, type, externalKey, row }: FieldProps): ReactElement => {
  // Custom fields
  switch (type) {
    case 'location': {
      const regionStr = row.region.value.map((v: { text: string }) => v.text).join(', ');
      const districtStr = row.district.value.map((v: { text: string }) => v.text).join(', ');
      const cityStr = row.city.value.map((v: { text: string }) => v.text).join(', ');
      const localityStr = row.locality.value.map((v: { text: string }) => v.text).join(', ');
      return <>{[regionStr, districtStr, cityStr, localityStr].filter((v) => !!v).join('; ')}</>;
    }
    case 'roadLink': {
      const links = row[getKey(fieldKey)].value;
      return (
        <>
          {links.map((link: { id: number; text: string }) => (
            <Link key={link.id} to={`/roads/${link.id}`} target="_blank" rel="noreferrer">
              {link.text}
            </Link>
          ))}
        </>
      );
    }
    case 'bridgeLink': {
      const name = row[getKey(fieldKey)].value;
      if (accessMatrixStoreInstance.doesHaveAccess('bridges_card__print')) {
        return (
          <Link to={`/bridges/${row.id}`} target="_blank" rel="noreferrer">
            {name}
          </Link>
        );
      }
      return <>{name}</>;
    }
    case 'roadStartBackboneNetwork': {
      return (
        <>
          <Link to={`/backboneNetwork/${row.id}`} target="_blank" rel="noreferrer">
            {row.start.value}
          </Link>
        </>
      );
    }
    case 'roadFinishBackboneNetwork': {
      return (
        <>
          <Link to={`/backboneNetwork/${row.id}`} target="_blank" rel="noreferrer">
            {row.finish.value}
          </Link>
        </>
      );
    }
    case 'roadStartDiagnostics': {
      return (
        <>
          <Link to={`/roadDiagnostics/${row.id}`} target="_blank" rel="noreferrer">
            {row.start.value}
          </Link>
        </>
      );
    }
    case 'roadFinishDiagnostics': {
      return (
        <>
          <Link to={`/roadDiagnostics/${row.id}`} target="_blank" rel="noreferrer">
            {row.finish.value}
          </Link>
        </>
      );
    }
    case 'roadStartSectionLink': {
      return (
        <>
          {row.id ? (
            <Link to={`/roadsOnBalance/${row.id}`} target="_blank" rel="noreferrer">
              {row.start.value}
            </Link>
          ) : (
            row.start.value
          )}
        </>
      );
    }
    case 'roadFinishSectionLink': {
      return (
        <>
          {row.id ? (
            <Link to={`/roadsOnBalance/${row.id}`} target="_blank" rel="noreferrer">
              {row.finish.value}
            </Link>
          ) : (
            row.finish.value
          )}
        </>
      );
    }
    // case 'estimate': {
    //   const info: EstimateInfoValue = { id: row.id, text: 'Все показатели' };
    //   return <Estimate estimateInfo={info} />;
    // }
    case 'owner': {
      let _k = getKey(fieldKey);
      let field = Object.hasOwn(row, _k) ? row[getKey(_k)] : null;
      if (externalKey) {
        _k = getKey(externalKey);
        field = Object.hasOwn(row, _k) ? row[_k] : field;
      }
      if (import.meta.env.DEV && !field) {
        console.warn(
          'Link to organization in Block not available',
          toJS(row),
          getKey(fieldKey),
          getKey(externalKey || '')
        );
      }
      const owner = field?.value[0] as OwnerValue;
      return <Owner owner={owner} />;
    }
    case 'agglomeration': {
      const field = row.name;
      const agglomeration = field?.value[0] as AgglomerationValue;
      return <Agglomeration agglomeration={agglomeration} />;
    }
    case 'region': {
      const field = row.subject;
      const region = field?.value[0] as RegionValue;
      return <Region region={region} />;
    }
    case 'violationFixation': {
      return <ViolationFixation row={row} />;
    }
    case 'map': {
      return <MapLink id={row.id} hasGeometry={row.hasGeometry} />;
    }
    case 'file': {
      return <DownloadFile file={row.file} />;
    }
    case 'files': {
      return <DownloadFiles files={row.file} />;
    }
  }
  // Base types
  const _key = getKey(fieldKey);
  const { value } = fieldKey === 'Blank' || !_key || !row[_key] ? { value: undefined } : row[_key];
  if (value === undefined) return <span className="text-muted">нет данных</span>;

  if (
    (['string' || 'date'].includes(type) && isObject(value)) ||
    (!['string' || 'date'].includes(type) && Array.isArray(value))
  ) {
    console.warn('Incorrect type!', value, type, fieldKey);
    return <></>;
  }

  switch (type) {
    case 'boolean': {
      return <>{value ? 'Да' : 'Нет'}</>;
    }
    case 'string':
    case 'date': {
      if (Array.isArray(value)) {
        return (
          <>
            {' '}
            {value.length ? (
              value.map((i: { text: string }) => i.text).join('; ')
            ) : (
              <span className="text-muted">нет данных</span>
            )}
          </>
        );
      }
      return <>{value || <span className="text-muted">нет данных</span>}</>;
    }
    case 'number': {
      return <>{formatNumber(value)}</>;
    }
  }

  return <span className="text-muted">нет данных</span>;
};

export default Field;
