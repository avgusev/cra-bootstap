import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { FiltersModal, Header, Main, PresetModal } from './views';
import DocTitle from '../../components/DocTitle';

import store from './store';
import { useSearchParams } from 'react-router-dom';

const { bridgesStore, presetStore, filtersLayoutStore } = store;

function AccidentsPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const textSearch = searchParams.get('textSearch');
    bridgesStore.init(textSearch || undefined);
    presetStore.loadPresets();
  }, [searchParams]);

  return (
    <>
      <DocTitle title="Мостовые сооружения" />
      <Header store={bridgesStore} />
      <Main store={bridgesStore} />
      <FiltersModal bridgesStore={bridgesStore} presetStore={presetStore} filtersLayoutStore={filtersLayoutStore} />
      <PresetModal presetStore={presetStore} />
    </>
  );
}

export default observer(AccidentsPage);
