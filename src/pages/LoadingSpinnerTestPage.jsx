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
      <LoadingSpinner.dotBounce dotCount={5} dotSize={15} dotGap={10} />
      <LoadingSpinner.dotBounce dotCount={8} dotSize={20} dotGap={15} />
      <LoadingSpinner.dotCircle dotCount={8} dotSize={12} distanceFromCenter={30} />
      <LoadingSpinner.dotCircle dotCount={15} dotSize={15} distanceFromCenter={45} />
      <LoadingSpinner.lineCircle lineWeight={8} distanceFromCenter={30} />
      <LoadingSpinner.lineCircle lineWeight={15} distanceFromCenter={50} />
    </section>
  );
};

export default LoadingSpinnerTestPage;
