import { ForwardedRef, forwardRef } from 'react';
import { Button as BSButton, ButtonProps as BSButtonProps } from 'react-bootstrap';
import classNames from 'classnames';
import SkdfIcon from '../SkdfIcon';
import Spinner from '../Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'stroke' | 'ghost' | 'function';
type ButtonProps = BSButtonProps & {
  variant?: ButtonVariant;
  icon?: JSX.Element | string;
  isLoading?: boolean;
};

function Button(
  { icon, isLoading, className, children, variant = 'primary', ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const classes = classNames(className, { 'is-loading': isLoading });

  if (icon) {
    const iconEl = typeof icon === 'string' ? <SkdfIcon name={icon} /> : icon;
    return (
      <BSButton ref={ref} className={classNames(classes, 'btn-icon')} variant={`skdf-${variant}`} {...props}>
        {isLoading ? <Spinner /> : iconEl}
        {children}
      </BSButton>
    );
  }

  return (
    <BSButton ref={ref} className={classNames(classes, { spinner: isLoading })} variant={`skdf-${variant}`} {...props}>
      {children}
    </BSButton>
  );
}

export type { ButtonVariant, ButtonProps };
export default forwardRef(Button);
