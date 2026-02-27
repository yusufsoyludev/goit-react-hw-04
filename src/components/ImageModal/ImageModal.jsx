import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ image, isOpen, onClose }) {
  if (!image) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      overlayClassName={css.overlay}
      className={css.modal}
      contentLabel="Image details"
    >
      <div className={css.content}>
        <img
          className={css.image}
          src={image.urls.regular}
          alt={image.alt_description || 'Selected image'}
        />
        <div className={css.meta}>
          <p>
            <strong>Author:</strong> {image.user.name}
          </p>
          <p>
            <strong>Likes:</strong> {image.likes}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {image.description || image.alt_description || 'N/A'}
          </p>
        </div>
      </div>
    </Modal>
  );
}
