import classes from './SkdfIcon.module.scss';
import path from './skdf-icons.svg';
import classNames from 'classnames';

type SkdfIconProps = React.HTMLAttributes<HTMLElement> & {
  name: string;
  width?: number;
  height?: number;
};

function SkdfIcon({ name, width, height, title, className, ...props }: SkdfIconProps) {
  const clsName = classNames('icon', classes.iconWrapper, className);
  return (
    <i className={clsName} title={title} {...props}>
      <svg className={classes.icon} width={width || 24} height={height || 24}>
        <use xlinkHref={`${path}#${name}`} />
      </svg>
    </i>
  );
}

export default SkdfIcon;
