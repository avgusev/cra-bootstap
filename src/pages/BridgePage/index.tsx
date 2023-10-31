import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { useEffect, useMemo } from 'react';

import DocTitle from '../../components/DocTitle';
import DetailedView from '../../features/DetailedView';
import Header from './components/Header';

import { bridgeStoreInstance } from './store';
import { cardList, navKeys } from './consts';

type RouterParams = {
  id: string;
};

function BridgePage() {
  const { id } = useParams<RouterParams>();

  const { fields, fetchBridgesImages } = bridgeStoreInstance;

  const ids = useMemo(() => {
    const values = fields['FOTO']?.val as { storageFileId: string }[];
    const ids = values?.map((el) => el.storageFileId);
    return ids;
  }, [fields]);

  useEffect(() => {
    fetchBridgesImages(ids);
  }, [ids, fetchBridgesImages]);

  return id ? (
    <>
      <DocTitle title="Мостовые сооружения" />
      <DetailedView
        id={id}
        storeInstance={bridgeStoreInstance}
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

export default observer(BridgePage);
