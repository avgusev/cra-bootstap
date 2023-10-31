import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Frame from '../../components/Frame';
import Select from '../../components/Select';
import { baseUrl } from '../../triaflyDesktopClient';
import { getDashboards } from './api';
import Training from '../../features/Training';
import { trainingStore } from '../../features/Training/store';

type Dashboard = { url: string; title: string };

const defaultDashboard = {
  url: `${baseUrl}/dashboard/shared/19432116/?14265457=2022-07-01+00%3A00%3A00%7C-59`,
  title: 'Консолидированный бюджет РФ, млн. ₽',
};

function Desktop() {
  const [isLoading, setIsLoading] = useState(true);
  const stopLoading = () => setIsLoading(false);
  const [dashboard, setDashboard] = useState<Dashboard>(defaultDashboard);
  const [dashboards, setDashboards] = useState<Dashboard[]>([defaultDashboard]);

  useEffect(() => {
    getDashboards()
      .then((data) => {
        const res = data.map((i: { id: number; '-3': string }) => ({
          url: `${baseUrl}/dashboard/shared/${i.id}`,
          title: i['-3'],
        }));
        setDashboards([defaultDashboard, ...res]);
      })
      .catch(() => {
        return setDashboards([defaultDashboard]);
      });
  }, []);

  return (
    <div>
      <header className="pt-4">
        <div className="d-lg-flex align-items-start mb-4">
          <h1 className="mb-lg-0 ms-4 me-2 flex-grow-1">Рабочий стол</h1>
          <Training id="dashboard" step={0} className="mb-2 mb-lg-0 me-2 flex-grow-1 flex-basis-0">
            <Select
              theme={(theme) => ({ ...theme, spacing: { ...theme.spacing, controlHeight: 48 } })}
              // className="mb-2 mb-lg-0 me-2 flex-grow-1 flex-basis-0"
              options={dashboards}
              defaultValue={dashboard}
              getOptionValue={(option) => option.url}
              getOptionLabel={(option) => option.title}
              onChange={(selected) => selected && setDashboard(selected)}
            />
          </Training>
          <Button
            variant="stroke"
            icon="question"
            className="flex-shrink-0"
            children="Помощь"
            onClick={() => trainingStore.showTrening('dashboard')}
          />
        </div>
      </header>
      <div>
        {isLoading && <span className="btn is-loading position-static spinner" role="status"></span>}

        <Frame
          src={dashboard.url}
          style={{ height: `calc(100vh - 78px)` }}
          title={dashboard.title}
          onLoad={stopLoading}
          onError={stopLoading}
        />
      </div>
    </div>
  );
}

export default Desktop;
