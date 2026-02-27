import css from './ImageCard.module.css';

export default function ImageCard({ image, onImageClick }) {
  return (
    <div className={css.card}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description || 'Unsplash image'}
        onClick={() => onImageClick(image)}
      />
    </div>
  );
}
