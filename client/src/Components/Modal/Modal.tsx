import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal">{children}</div>
    </>,
    document.getElementById('portal') as HTMLElement,
  );
}

export default Modal;
