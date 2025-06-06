import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const LoadingSpinnerTestPage = () => {
  return (
    <section
      style={{
        width: '100%',
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <LoadingSpinner.dotBounce />
      <LoadingSpinner.dotCircle />
      <LoadingSpinner.lineCircle />
    </section>
  );
};

export default LoadingSpinnerTestPage;
