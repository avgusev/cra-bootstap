import { ReactNode } from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Button from '../../../../../components/Button';

type WithInfoButtonProps = {
  children: ReactNode | string;
  tooltipContent: ReactNode | string;
};

const WithInfoButton = ({ children, tooltipContent }: WithInfoButtonProps) => {
  return (
    <div className="table-info-group" role="group">
      <div>{children}</div>
      <OverlayTrigger
        placement="bottom"
        trigger={['hover', 'focus']}
        rootClose
        overlay={<Tooltip id="button-tooltip">{tooltipContent}</Tooltip>}
        defaultShow={false}
      >
        <Button variant="function" icon="info" className="me-4 inline-block" />
      </OverlayTrigger>
    </div>
  );
};

export default WithInfoButton;
