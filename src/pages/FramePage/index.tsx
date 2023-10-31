import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Frame from '../../components/Frame';
import { dashboards } from '../../menu';

function FramePage() {
  const [isLoading, setIsLoading] = useState(true);
  const stopLoading = () => setIsLoading(false);
  const { title } = useParams();
  const dashboard = dashboards.find((dashboard) => dashboard.title === title);

  return (
    <>
      {isLoading && <span className="btn is-loading position-static spinner" role="status"></span>}

      {dashboard && <Frame src={dashboard.url} title={dashboard.title} onLoad={stopLoading} onError={stopLoading} />}
    </>
  );
}
export default FramePage;
