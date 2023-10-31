import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import DocTitle from '../../components/DocTitle';
import DetailedView from '../../features/DetailedView';
import Header from './components/Header';

import { roadDiagnosticsStoreInstance } from './store';
import { cardList, navKeys } from './consts';
import TableTemplate from './components/TableTemplate';
import {
  crossColumns,
  lateralColumns,
  pavementColumns,
  smoothnessColumns,
  curveRadiusesColumns,
  defectsColumns,
  depthMeasurementsColumns,
} from './meta';

type RouterParams = {
  id: string;
};

// @TODO сузить тип
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customTemplates: Record<string, (props: any) => JSX.Element> = {
  'Ведомость измерения глубины колеи': (data) => <TableTemplate {...data} columns={depthMeasurementsColumns} />,
  'Ведомость дефектов покрытия': (data) => <TableTemplate {...data} columns={defectsColumns} />,
  'Ведомость измерения коэффициента сцепления': (data) => (
    <TableTemplate {...data} columns={depthMeasurementsColumns} />
  ),
  'Ведомость измерения продольной ровности на 100 м': (data) => <TableTemplate {...data} columns={smoothnessColumns} />,
  'Ведомость измерения продольной ровности на 1 км': (data) => <TableTemplate {...data} columns={smoothnessColumns} />,
  'Ведомость измерений прочности дорожной одежды': (data) => <TableTemplate {...data} columns={pavementColumns} />,
  'Ведомость поперечных уклонов': (data) => <TableTemplate {...data} columns={crossColumns} />,
  'Ведомость продольных уклонов': (data) => <TableTemplate {...data} columns={lateralColumns} />,
  'Ведомость радиусов кривых в плане': (data) => <TableTemplate {...data} columns={curveRadiusesColumns} />,
};

function RoadDiagnosticsPage() {
  const { id } = useParams<RouterParams>();

  const { fields } = roadDiagnosticsStoreInstance;

  return id ? (
    <>
      <DocTitle title="Результаты диагностики" />
      <DetailedView
        id={id}
        storeInstance={roadDiagnosticsStoreInstance}
        cardList={cardList}
        navKeys={navKeys}
        header={<Header id={id} fields={fields} />}
        customTemplates={customTemplates}
        isMap={false}
      />
    </>
  ) : (
    <></>
  );
}

export default observer(RoadDiagnosticsPage);
