import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';

export type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

function Skeleton({ className, style, children }: SkeletonProps) {
  const css: CSSProperties = {
    borderRadius: '0.25rem',
    ...style,
  };
  return (
    <div className={classNames('bg-skeleton flex-shrink-0', className)} style={css}>
      {children}
    </div>
  );
}

export default Skeleton;
