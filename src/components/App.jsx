import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRequest } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = ({ handleInputChange }) => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, modalData: null });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        const requestedHits = await fetchRequest(query, page);
        if (query === '' && page === 1) {
          return;
        }
        if (page === 1) {
          setHits(requestedHits.hits);
          setShowLoadMore(true);
        } else {
          setHits(prevHits => [...prevHits, ...requestedHits.hits]);
          setShowLoadMore(true);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, [page, query]);

  const onSubmit = tags => {
    setQuery(tags);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = modalData => {
    setModal({ isOpen: true, modalData: modalData });
  };

  const onCloseModal = () => {
    setModal({ isOpen: false, modalData: null });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} handleInputChange={handleInputChange} />
      <ToastContainer autoClose={3000} />
      <ImageGallery hits={hits} onOpenModal={onOpenModal} />
      <Loader isLoading={isLoading} error={error} />
      <LoadMore handleLoadMore={handleLoadMore} showLoadMore={showLoadMore} />
      <Modal
        onCloseModal={onCloseModal}
        modalData={modal.modalData}
        isOpen={modal.isOpen}
      />
    </div>
  );
};
