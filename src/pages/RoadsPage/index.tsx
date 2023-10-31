import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import store from './store';
import { Header, Main, FiltersModal, PresetModal } from './views';
import { useSearchParams } from 'react-router-dom';
import DocTitle from '../../components/DocTitle';

const { roadsStore, presetStore, filtersLayoutStore } = store;

function RoadsPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const textSearch = searchParams.get('textSearch');
    roadsStore.init(textSearch || undefined);
    presetStore.loadPresets();
  }, [searchParams]);

  return (
    <>
      <DocTitle title="Реестр дорог" />
      <Header roadsStore={roadsStore} />
      <Main roadsStore={roadsStore} />
      <FiltersModal roadsStore={roadsStore} presetStore={presetStore} filtersLayoutStore={filtersLayoutStore} />
      <PresetModal presetStore={presetStore} />
    </>
  );
}

export default observer(RoadsPage);
