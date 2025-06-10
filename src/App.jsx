import Routes from '@/routes/AppRouter';
import Style from '@/assets/styles/App.module.scss';

const App = () => {
  return (
    <div className={Style['app']}>
      <main>
        {/* 라우터에 의해 페이지가 랜더링 */}
        <Routes />
      </main>
    </div>
  );
};

export default App;
