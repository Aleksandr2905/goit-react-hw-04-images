export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) => {
  return (
    <li key={id} className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => onOpenModal(largeImageURL)}
      />
    </li>
  );
};
