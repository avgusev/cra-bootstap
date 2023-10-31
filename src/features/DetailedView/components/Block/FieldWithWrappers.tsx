import { BlockMetadata } from '../../types';
import WithInfoButton from './fields/WithInfoButton';
import Field from './Field';

type FieldWithWrappersProps = {
  fieldKey: string;
  type: BlockMetadata['type'];
  externalKey: string | undefined;
  hasDate: boolean | undefined;
  // @TODO narrow type (see: https://git.stdev.ru/skdf/kraken/skdf.portal.ui/-/blob/master/src/api/dto/common.ts#L34)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
};

const FieldWithWrappers = ({ fieldKey, type, externalKey, hasDate, row }: FieldWithWrappersProps) => {
  const value = <Field fieldKey={fieldKey} type={type} externalKey={externalKey} row={row} />;
  if (!hasDate) return <>{value}</>;

  const dateStart = row.dateStart?.value;
  const dateFinish = row.dateFinish?.value;

  return (
    <WithInfoButton
      tooltipContent={
        <>
          <div>Дата начала: {dateStart ? dateStart : '-'}</div>
          <div>Дата окончания: {dateFinish ? dateFinish : '-'}</div>
        </>
      }
    >
      {value}
    </WithInfoButton>
  );
};

export default FieldWithWrappers;
