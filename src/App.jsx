import Routes from '@/routes/AppRouter';
import Style from '@/assets/styles/App.module.scss';
import { useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const App = () => {
  const location = useLocation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Rolling</title>
        <meta name='description' content='Rolling : 롤링페이퍼 커뮤니티 플랫폼' />
      </Helmet>
      {location.pathname === '/' && (
        <Helmet>
          <meta property='og:title' content='Rolling' />
          <meta
            property='og:description'
            content='친구나 동료들과 따뜻한 메시지를 주고받아 보세요'
          />
          <meta
            property='og:image'
            content={`${window.location.origin}/images/image_opengraph.svg`}
          />
          <meta property='og:url' content={window.location.href} />
          <meta property='og:type' content='website' />
        </Helmet>
      )}

      <div className={Style['app']}>
        <main>
          {/* 라우터에 의해 페이지가 랜더링 */}
          <Routes />
        </main>
      </div>
    </HelmetProvider>
  );
};

export default App;
