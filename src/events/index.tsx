import { useRoutes } from 'react-router-dom';
import OverhaulsPage from './programs/OverhaulsPage';

const pages = [
  {
    path: 'programs/construction',
    element: <h1>Construction</h1>,
  },
  {
    path: 'programs/overhauls',
    element: <OverhaulsPage />,
  },
  {
    path: 'programs/repair',
    element: <h1>Repair</h1>,
  },
  {
    path: 'programs/maintenance',
    element: <h1>Maintenance</h1>,
  },
];

function EventsRoutes() {
  return useRoutes([...pages]);
}

function Events() {
  return (
    <div className="ms-3">
      <EventsRoutes />
    </div>
  );
}

export default Events;
