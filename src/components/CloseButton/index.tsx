import { CloseButton as BSCloseButton, CloseButtonProps as BSCloseButtonProps } from 'react-bootstrap';
import classNames from 'classnames';

type CloseButtonProps = BSCloseButtonProps & {
  absolute?: boolean;
};

function CloseButton({ absolute, className, ...props }: CloseButtonProps) {
  return (
    <BSCloseButton
      className={classNames(className, {
        'btn-close-absolute': absolute,
      })}
      {...props}
    />
  );
}

export default CloseButton;
