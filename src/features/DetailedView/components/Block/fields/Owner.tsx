import { observer } from 'mobx-react-lite';

import Button from '../../../../../components/Button';
import { organizationStoreInstance } from '../../../store';

export type OwnerValue = {
  hash: string;
  id: number;
  isDeleted: boolean;
  isNew: boolean;
  text: string;
};

type OwnerProps = {
  owner: OwnerValue;
};

const Owner = ({ owner }: OwnerProps) => {
  const { getOrganizationMiniPassport } = organizationStoreInstance;

  return (
    <>
      {owner ? (
        <Button
          variant="function"
          className="text-start inline-block"
          onClick={() => getOrganizationMiniPassport(owner.id)}
        >
          {owner.text}
        </Button>
      ) : (
        <span className="text-muted">нет данных</span>
      )}
    </>
  );
};

export default observer(Owner);
