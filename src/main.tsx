import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import 'normalize.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { RootPath } from './constant/RootPath.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Auth0Provider
      domain="keibo-auth.jp.auth0.com"
      clientId="Op4WEEuVCW0XBwCSMoWhjwHc7VgArUzO"
      authorizationParams={{
        redirect_uri: `${RootPath.ROOT_PATH}/`
      }}
    >
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </QueryClientProvider>
    </Auth0Provider>
  </Provider>
);
