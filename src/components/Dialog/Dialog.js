import React from 'react';
import Modal from 'react-modal';
import Button from '../Button';
import './Dialog.scss';

Modal.setAppElement('#root');

export default function Dialog(props) {
  const { isOpen, title, description, onSubmit, onCancel } = props;
  return (
    <Modal isOpen={isOpen} className="Dialog" overlayClassName="Overlay">
      <div className="Modal--container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <Button className="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="danger" onClick={onSubmit}>
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
}
