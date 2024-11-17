// import "ag-grid-enterprise";
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { store, persistor } from 'web/utils';

import './styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId='414799316999-42490psla83o0nestmgfsvvs33u483tl.apps.googleusercontent.com'>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
