export const LoadMore = ({ handleLoadMore, showLoadMore }) => {
  return (
    <>
      {showLoadMore && (
        <button className="Button" onClick={handleLoadMore} type="submit">
          Load more
        </button>
      )}
    </>
  );
};
