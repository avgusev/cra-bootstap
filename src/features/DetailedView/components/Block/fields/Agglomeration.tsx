import { observer } from 'mobx-react-lite';

import Button from '../../../../../components/Button';
import { agglomerationStoreInstance } from '../../../store';

export type AgglomerationValue = {
  hash: string;
  id: number;
  isDeleted: boolean;
  isNew: boolean;
  text: string;
};

type AgglomerationProps = {
  agglomeration: AgglomerationValue;
};

const Agglomeration = ({ agglomeration }: AgglomerationProps) => {
  const { getAgglomerationMiniPassport } = agglomerationStoreInstance;

  return (
    <Button
      variant="function"
      className="text-start inline-block"
      onClick={() => getAgglomerationMiniPassport(agglomeration.id)}
    >
      {agglomeration.text}
    </Button>
  );
};

export default observer(Agglomeration);
