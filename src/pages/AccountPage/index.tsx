import { observer } from 'mobx-react-lite';

import DocTitle from '../../components/DocTitle';
import DetailedView from '../../features/DetailedView';

import Header from './components/Header';
import { profileStoreInstance } from './store';
import { cardList, navKeys } from './consts';

function ProfilePage() {
  return (
    <>
      <DocTitle title="Аккаунт" />

      <DetailedView
        id={'account'}
        storeInstance={profileStoreInstance}
        cardList={cardList}
        navKeys={navKeys}
        header={<Header />}
      />
    </>
  );
}

export default observer(ProfilePage);
