import { useEffect } from 'react';

export const Modal = ({ modalData, tags, isOpen, onCloseModal }) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onCloseModal]);

  return (
    isOpen && (
      <div className="Overlay" onClick={handleOverlayClick}>
        <div className="Modal">
          <img src={modalData} alt={tags} />
        </div>
      </div>
    )
  );
};
