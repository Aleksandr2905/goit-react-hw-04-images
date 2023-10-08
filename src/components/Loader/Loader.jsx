import { Hourglass } from 'react-loader-spinner';

export const Loader = ({ isLoading, error }) => {
  return (
    <div className="Loader">
      {isLoading ? (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      ) : null}
      {error ? <p>Error: {error}</p> : null}
    </div>
  );
};
