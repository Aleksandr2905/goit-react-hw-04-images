import { Component } from 'react';

export class Modal extends Component {
  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  handleEscape = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOverlayClick);
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOverlayClick);
    document.removeEventListener('keydown', this.handleEscape);
  }

  render() {
    const { modalData, tags, isOpen } = this.props;
    return (
      isOpen && (
        <div className="Overlay" onClick={this.handleOverlayClick}>
          <div className="Modal">
            <img src={modalData} alt={tags} />
          </div>
        </div>
      )
    );
  }
}
