import { ForwardedRef, forwardRef } from 'react';
import { Badge as BSBadge, BadgeProps as BSBadgeProps } from 'react-bootstrap';
import classNames from 'classnames';

type BadgeProps = BSBadgeProps & {
  round?: boolean;
  counter?: boolean;
};

function Badge(
  { bg = 'danger', round = false, counter = false, ...props }: BadgeProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <BSBadge ref={ref} bg={bg} className={classNames({ 'badge-round': round, 'badge-counter': counter })} {...props}>
      {props.children}
    </BSBadge>
  );
}

export type { BadgeProps };
export default forwardRef(Badge);
