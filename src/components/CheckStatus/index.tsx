import classNames from 'classnames';
import SkdfIcon from '../SkdfIcon';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import type { Field } from '../../features/DetailedView/types';
import { ValueElement } from '../../features/DetailedView/types';

type CheckStatusProps = {
  fields: Record<string, Field>;
  value?: string[];
  className?: string;
};

function CheckStatus({ fields, value = ['Проверено', 'Не проверено'], className = '' }: CheckStatusProps) {
  const checked = Boolean(fields.IS_CHECKED.val);
  const confirmUserField = (fields?.CONFIRM_USER?.val as ValueElement[])[0];
  const dateConfirmation = fields?.DATA_CONFIRMATION?.val as string;
  const timeConfirmation = fields?.TIME_CONFIRMATION?.val as string;

  const checkStatusContent = (
    <div className={classNames('d-inline-flex gap-2', className)}>
      <div className={classNames(checked ? 'text-success' : 'text-danger')}>
        <SkdfIcon name={checked ? 'circle_verified' : 'circle_not_verified'} />
      </div>
      {checked ? value[0] : value[1]}
    </div>
  );

  if (checked && confirmUserField) {
    return (
      <OverlayTrigger
        placement="bottom"
        trigger={['hover', 'focus']}
        rootClose
        overlay={
          <Tooltip id="checked-tooltip" className="confirmation-tooltip">
            <span className="confirmation-tooltip__confirmUserName">{confirmUserField.text}</span>
            <span className="confirmation-tooltip__confirmDateTime">
              {`${dateConfirmation || ''} ${timeConfirmation || ''}`}
            </span>
          </Tooltip>
        }
        defaultShow={false}
      >
        {checkStatusContent}
      </OverlayTrigger>
    );
  }
  return checkStatusContent;
}

export default CheckStatus;
