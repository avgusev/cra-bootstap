import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import DocTitle from '../../components/DocTitle';
import DetailedView from '../../features/DetailedView';

import Header from './components/Header';
import { backboneNetworkStoreInstance } from './store';
import { cardList, navKeys } from './consts';

type RouterParams = {
  id: string;
};

function BackboneNetworkPage() {
  const { id } = useParams<RouterParams>();

  const { fields } = backboneNetworkStoreInstance;

  return id ? (
    <>
      <DocTitle title="Участок опорной сети" />
      <DetailedView
        id={id}
        storeInstance={backboneNetworkStoreInstance}
        cardList={cardList}
        navKeys={navKeys}
        header={<Header id={id} fields={fields} />}
        isMap={false}
      />
    </>
  ) : (
    <></>
  );
}

export default observer(BackboneNetworkPage);
