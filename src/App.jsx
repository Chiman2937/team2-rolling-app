import Routes from '@/routes/AppRouter';
import Style from '@/assets/styles/App.module.scss';
import Dropdown from './components/Dropdown';

function App() {
  return (
    <div className={Style['app']}>
      {/*TODO: 헤더 컴포넌트 추가*/}
      <main>
        {/* 라우터에 의해 페이지가 랜더링 */}
        <Routes />
        <Dropdown dropdownItems={['친구']} error />
      </main>
    </div>
  );
}

export default App;
