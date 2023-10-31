import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import DocTitle from '../../components/DocTitle';
import DetailedView from '../../features/DetailedView';

import Header from './components/Header';
import { accidentStoreInstance } from './store';
import { cardList, navKeys } from './consts';
import RoadConditionsTemplate from './components/RoadConditionsTemplate';
import ParticipantsTemplate from './components/ParticipantsTemplate';

type RouterParams = {
  id: string;
};

// @TODO сузить тип
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customTemplates: Record<string, (props: any) => JSX.Element> = {
  'Дорожные условия': (data) => <RoadConditionsTemplate {...data} />,
  Участники: (data) => <ParticipantsTemplate {...data} />,
};

function AccidentPage() {
  const { id } = useParams<RouterParams>();

  const { fields } = accidentStoreInstance;

  return id ? (
    <>
      <DocTitle title="ДТП" />
      <DetailedView
        id={id}
        storeInstance={accidentStoreInstance}
        cardList={cardList}
        navKeys={navKeys}
        header={<Header id={id} fields={fields} />}
        customTemplates={customTemplates}
      />
    </>
  ) : (
    <></>
  );
}

export default observer(AccidentPage);
