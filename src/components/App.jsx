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

  // const fetchImage = async () => {
  //   try {
  //     setIsLoading(true);
  //     const requestedHits = await fetchRequest(query, page);
  //     if (page === 1) {
  //       setHits(requestedHits.hits);
  //       setShowLoadMore(true);
  //     } else {
  //       setHits(prevHits => [...prevHits, ...requestedHits.hits]);
  //       setShowLoadMore(true);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        const requestedHits = await fetchRequest(query, page);
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

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        setIsLoading(true);
        const randomHits = await fetchRequest(
          Math.round(Math.random() * (100 - 10) + 10)
        );
        setHits(randomHits.hits);
        setShowLoadMore(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRandomImages();
  }, []);

  // const fetchRandomImages = async () => {
  //   try {
  //     setIsLoading(true);
  //     const randomHits = await fetchRequest(
  //       Math.round(Math.random() * (100 - 10) + 10)
  //     );
  //     setHits(randomHits.hits);
  //     setShowLoadMore(false);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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

// export class App extends Component {
//   state = {
//     hits: [],
//     query: '',
//     page: 1,
//     isLoading: false,
//     error: null,
//     showLoadMore: false,
//     modal: {
//       isOpen: false,
//       modalData: null,
//     },
//   };

//   fetchImage = async () => {
//     const { query, page, hits } = this.state;
//     try {
//       this.setState({ isLoading: true });
//       const requestedHits = await fetchRequest(query, page);
//       if (page === 1) {
//         this.setState({ hits: requestedHits.hits, showLoadMore: true });
//         return;
//       } else {
//         this.setState({
//           hits: hits.concat(requestedHits.hits),
//           showLoadMore: true,
//         });
//       }
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   componentDidMount() {
//     this.fetchRandomImages();
//   }

//   fetchRandomImages = async () => {
//     try {
//       this.setState({ isLoading: true });
//       const randomHits = await fetchRequest(
//         Math.round(Math.random() * (100 - 10) + 10)
//       );
//       this.setState({ hits: randomHits.hits, showLoadMore: false });
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.fetchImage();
//     }
//   }

//   onSubmit = tags => {
//     this.setState({ query: tags, page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   onOpenModal = modalData => {
//     this.setState({ modal: { isOpen: true, modalData: modalData } });
//   };

//   onCloseModal = () => {
//     this.setState({ modal: { isOpen: false, modalData: null } });
//   };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar
//           handleInputChange={this.handleInputChange}
//           onSubmit={this.onSubmit}
//         />
//         <ToastContainer autoClose={3000} />
//         <ImageGallery hits={this.state.hits} onOpenModal={this.onOpenModal} />
//         <Loader isLoading={this.state.isLoading} error={this.state.error} />
//         <LoadMore
//           handleLoadMore={this.handleLoadMore}
//           showLoadMore={this.state.showLoadMore}
//         />
//         <Modal
//           onCloseModal={this.onCloseModal}
//           modalData={this.state.modal.modalData}
//           isOpen={this.state.modal.isOpen}
//         />
//       </div>
//     );
//   }
// }
