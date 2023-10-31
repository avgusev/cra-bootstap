import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { FiltersModal, Header, Main, PresetModal } from './views';
import DocTitle from '../../components/DocTitle';

import store from './store';
import { useSearchParams } from 'react-router-dom';

const { accidentsStore, presetStore, filtersLayoutStore } = store;

function AccidentsPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const textSearch = searchParams.get('textSearch');
    accidentsStore.init(textSearch || undefined);
    presetStore.loadPresets();
  }, [searchParams]);

  return (
    <>
      <DocTitle title="ДТП" />
      <Header store={accidentsStore} />
      <Main store={accidentsStore} />
      <FiltersModal accidentsStore={accidentsStore} presetStore={presetStore} filtersLayoutStore={filtersLayoutStore} />
      <PresetModal presetStore={presetStore} />
    </>
  );
}

export default observer(AccidentsPage);
