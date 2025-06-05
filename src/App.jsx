import Routes from '@/routes/AppRouter';
import Style from '@/assets/styles/App.module.scss';
import GlobalHeader from '@/components/Header/GlobalHeader';

function App() {
  return (
    <div className={Style['app']}>
      <GlobalHeader />
      <main>
        {/* 라우터에 의해 페이지가 랜더링 */}
        <Routes />
      </main>
    </div>
  );
}

export default App;
