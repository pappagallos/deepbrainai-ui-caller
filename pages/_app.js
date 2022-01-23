import 'react-app-polyfill/ie11';

import wrapper from '../store/configureStore';

import '../styles/globals.scss';

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} className='app_container' />;
}

export default wrapper.withRedux(MyApp);
