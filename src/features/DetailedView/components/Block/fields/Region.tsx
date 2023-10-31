import { observer } from 'mobx-react-lite';

import Button from '../../../../../components/Button';
import { regionStoreInstance } from '../../../store';

export type RegionValue = {
  hash: string;
  id: number;
  isDeleted: boolean;
  isNew: boolean;
  text: string;
};

type RegionProps = {
  region: RegionValue;
};

const Region = ({ region }: RegionProps) => {
  const { getRegionMiniPassport } = regionStoreInstance;

  return (
    <Button variant="function" className="text-start inline-block" onClick={() => getRegionMiniPassport(region.id)}>
      {region.text}
    </Button>
  );
};

export default observer(Region);
