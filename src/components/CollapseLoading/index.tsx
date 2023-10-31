import { ReactNode, useState } from 'react';
import { Collapse, CollapseProps } from 'react-bootstrap';
import classNames from 'classnames';

type CollapseLoadingProps = CollapseProps & {
  isLoading?: boolean;
  header: string | ReactNode;
  iconRight?: boolean;
  onClick?: (prev?: boolean) => void;
};

function CollapseLoading({
  isLoading,
  in: isOpen,
  header,
  onClick,
  iconRight = false,
  ...props
}: CollapseLoadingProps) {
  const [internalShow, setInternalShow] = useState(false);
  const show = isOpen === undefined ? internalShow : isOpen;

  return (
    <div className="accordion accordion-flush">
      <div className="accordion-item">
        <h2 className={classNames('accordion-header', { 'is-loading': isLoading, 'accordion-icon-left': !iconRight })}>
          <button
            className={classNames('accordion-button', { collapsed: !show })}
            onClick={() => {
              setInternalShow((prev) => !prev);
              onClick && onClick(isOpen);
            }}
          >
            {typeof header === 'string' ? <span className="h4 mb-0">{header}</span> : header}
          </button>
        </h2>
        <Collapse in={show} {...props}>
          <div className="accordion-collapse">
            <div className="accordion-body">{props.children}</div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default CollapseLoading;
