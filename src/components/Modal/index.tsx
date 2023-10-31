import { Modal as BSModal, ModalProps as BSModalProps } from 'react-bootstrap';
import classNames from 'classnames';
import { ReactNode } from 'react';
import useShowBottomShadow from '../../hooks/useShowBottomShadow';
import CloseButton from '../CloseButton';

type ModalProps = BSModalProps & {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
};

function Modal({ header, body, footer, contentClassName, ...props }: ModalProps) {
  if (props.centered === undefined) props.centered = true;
  if (props.scrollable === undefined) props.scrollable = true;

  const [hasScrollbar, showBottomShadow, modalBodyRef] = useShowBottomShadow();

  return (
    <BSModal {...props} contentClassName={classNames('skdf-shadow-down-16dp', contentClassName)}>
      <CloseButton absolute onClick={props.onHide} />
      {header && <BSModal.Header className="px-5 pb-3 pt-2r">{header}</BSModal.Header>}
      {body && (
        <BSModal.Body className={classNames('px-5 py-0', { 'pe-4': Boolean(hasScrollbar) })} ref={modalBodyRef}>
          {body}
        </BSModal.Body>
      )}
      {footer && (
        <BSModal.Footer
          className={classNames('px-5', { 'skdf-shadow-right-4dp': Boolean(showBottomShadow) })}
          style={{ zIndex: '1' }}
        >
          {footer}
        </BSModal.Footer>
      )}
      {props.children}
    </BSModal>
  );
}

export default Object.assign(Modal, {
  Body: BSModal.Body,
  Header: BSModal.Header,
  Title: BSModal.Title,
  Footer: BSModal.Footer,
  Dialog: BSModal.Dialog,
  TRANSITION_DURATION: BSModal.TRANSITION_DURATION,
  BACKDROP_TRANSITION_DURATION: BSModal.BACKDROP_TRANSITION_DURATION,
});
