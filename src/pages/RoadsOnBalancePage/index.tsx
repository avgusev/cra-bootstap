import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import DocTitle from '../../components/DocTitle';
import DetailedView from '../../features/DetailedView';
import Header from './components/Header';

import { roadsOnBalanceStoreInstance } from './store';
import { cardList, navKeys } from './consts';

type RouterParams = {
  id: string;
};

function RoadsOnBalancePage() {
  const { id } = useParams<RouterParams>();

  const { fields } = roadsOnBalanceStoreInstance;

  return id ? (
    <>
      <DocTitle title="Участок на балансе" />
      <DetailedView
        id={id}
        storeInstance={roadsOnBalanceStoreInstance}
        cardList={cardList}
        navKeys={navKeys}
        header={<Header id={id} fields={fields} />}
      />
    </>
  ) : (
    <></>
  );
}

export default observer(RoadsOnBalancePage);
