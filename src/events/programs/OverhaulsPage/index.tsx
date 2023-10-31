import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Header, Main } from './views';
import DocTitle from '../../../components/DocTitle';

import store from './store';
import { useSearchParams } from 'react-router-dom';
import TemplatedModal from '../../../features/TemplatedModal';

const { overhaulsStore } = store;

function OverhaulsPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const textSearch = searchParams.get('textSearch');
    overhaulsStore.init(textSearch || undefined);
    // presetStore.loadPresets();
  }, [searchParams]);

  return (
    <>
      <DocTitle title="Программы капитального ремонта" />
      <Header store={overhaulsStore} />
      <Main store={overhaulsStore} />
      <TemplatedModal />
    </>
  );
}

export default observer(OverhaulsPage);
