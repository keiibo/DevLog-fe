import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import 'normalize.css';
import { Analytics } from '@vercel/analytics/react';

const queryClient = new QueryClient();

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('./mocks/browser.ts');

  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
    <Analytics />
  </Provider>
);
