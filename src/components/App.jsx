import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRequest } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    hits: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    showLoadMore: false,
    modal: {
      isOpen: false,
      modalData: null,
    },
  };

  fetchImage = async () => {
    const { query, page, hits } = this.state;
    try {
      this.setState({ isLoading: true });
      const requestedHits = await fetchRequest(query, page);
      if (page === 1) {
        this.setState({ hits: requestedHits.hits, showLoadMore: true });
        return;
      } else {
        this.setState({
          hits: hits.concat(requestedHits.hits),
          showLoadMore: true,
        });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchRandomImages();
  }

  fetchRandomImages = async () => {
    try {
      this.setState({ isLoading: true });
      const randomHits = await fetchRequest(
        Math.round(Math.random() * (100 - 10) + 10)
      );
      this.setState({ hits: randomHits.hits, showLoadMore: false });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImage();
    }
  }

  onSubmit = tags => {
    this.setState({ query: tags, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = modalData => {
    this.setState({ modal: { isOpen: true, modalData: modalData } });
  };

  onCloseModal = () => {
    this.setState({ modal: { isOpen: false, modalData: null } });
  };

  render() {
    return (
      <div className="App">
        <Searchbar
          handleInputChange={this.handleInputChange}
          onSubmit={this.onSubmit}
        />
        <ToastContainer autoClose={3000} />
        <ImageGallery hits={this.state.hits} onOpenModal={this.onOpenModal} />
        <Loader isLoading={this.state.isLoading} error={this.state.error} />
        <LoadMore
          handleLoadMore={this.handleLoadMore}
          showLoadMore={this.state.showLoadMore}
        />
        <Modal
          onCloseModal={this.onCloseModal}
          modalData={this.state.modal.modalData}
          isOpen={this.state.modal.isOpen}
        />
      </div>
    );
  }
}
