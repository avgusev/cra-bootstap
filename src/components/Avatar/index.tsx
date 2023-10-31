import { useState, useMemo } from 'react';
import classNames from 'classnames';
import classes from './Avatar.module.scss';

interface AvatarProps {
  src?: string;
  size: number;
  name?: string;
  className?: string;
}

function Avatar({ src, size, name, className = 'rounded-circle' }: AvatarProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const showImage = src && !error;
  const showName = name && (!src || error);
  const showPlaceholder = !showImage && !showName;

  const styles = { minWidth: size, width: size, height: size, fontSize: size / 2 };
  const newClassName = classNames(classes.avatar, className, {
    [classes.none]: showPlaceholder,
  });

  const initials = useMemo(() => {
    if (!name) return name;

    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }, [name]);

  return (
    <div style={styles} className={newClassName}>
      <img
        style={styles}
        className={classNames({ [classes['display-none']]: isLoading || !showImage })}
        src={src}
        alt="avatar"
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setError(true);
        }}
      />
      {initials}
    </div>
  );
}

export default Avatar;
