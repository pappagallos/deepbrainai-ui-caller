import 'react-app-polyfill/ie11';
import {RecoilRoot} from 'recoil';

import '../styles/globals.scss';

function MyApp({Component, pageProps}) {
  return (
    <RecoilRoot>
      <Component {...pageProps} className='app_container' />
    </RecoilRoot>
  );
}

export default MyApp;
