import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import DocTitle from '../../components/DocTitle';
import DetailedView from '../../features/DetailedView';

import Header from './components/Header';
import { roadStoreInstance } from './store';
import { cardList, navKeys } from './consts';

type RouterParams = {
  id: string;
};

function RoadPage() {
  const { id } = useParams<RouterParams>();

  const { fields } = roadStoreInstance;

  return id ? (
    <>
      {fields.FULL_NAME?.val ? <DocTitle title={String(fields.FULL_NAME.val)} /> : null}
      <DetailedView
        id={id}
        storeInstance={roadStoreInstance}
        cardList={cardList}
        navKeys={navKeys}
        header={<Header id={id} fields={fields} />}
      />
    </>
  ) : (
    <></>
  );
}

export default observer(RoadPage);
