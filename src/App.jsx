import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import Loader from './components/Loader/Loader.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from './components/ImageModal/ImageModal.jsx';
import { searchImages } from './services/unsplashApi.js';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchImages() {
      try {
        setLoading(true);
        setError(false);

        const data = await searchImages(query, page);

        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);

        if (data.results.length === 0) {
          toast('No images found for this query.');
        }
      } catch (err) {
        setError(true);
        toast.error(err?.message || 'Image request failed.');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) {
      toast('This query is already displayed.');
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalPages(0);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const canLoadMore = images.length > 0 && page < totalPages;

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}
      {!error && images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {canLoadMore && !loading && <LoadMoreBtn onClick={handleLoadMore} />}

      <ImageModal
        image={selectedImage}
        isOpen={Boolean(selectedImage)}
        onClose={closeModal}
      />
    </div>
  );
}
