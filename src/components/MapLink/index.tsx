import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import SkdfIcon from '../SkdfIcon';

type MapLinkProps = {
  id: number | string;
  hasGeometry: boolean;
};

function MapLink({ id, hasGeometry }: MapLinkProps) {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{hasGeometry ? 'Показать геометрию на карте' : 'Геометрия недоступна'}</Tooltip>}
    >
      <div>
        <Link
          to={`/map/${id}`}
          className={classNames('btn btn-icon btn-skdf-function', {
            disabled: !hasGeometry,
          })}
        >
          <SkdfIcon name="map" />
        </Link>
      </div>
    </OverlayTrigger>
  );
}

export default MapLink;
