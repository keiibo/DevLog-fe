import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Colors } from '../src/style/Colors';
import { Theme } from '../src/style/Theme';
import GlobalStyle from '../src/style/GlobalStyle';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../src/store/slice/auth/authSlice';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswDecorator, mswLoader } from 'msw-storybook-addon';

// MSWの初期化
initialize({
  onUnhandledRequest: 'bypass' // 未処理のリクエストをバイパス
});
export const loaders = [mswLoader];

// export const preview: Preview = {
//   parameters: {
//     msw: {
//       handlers
//     },
//     // TODO.適用されてない
//     backgrounds: {
//       default: 'white',
//       values: [
//         { name: 'main', value: Colors.MAIN },
//         { name: 'white', value: Colors.WHITE }
//       ]
//     },
//     actions: { argTypeRegex: '^on[A-Z].*' },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i
//       }
//     }
//   },
//   tags: ['autodocs']
// };

const store = configureStore({
  reducer: {
    // loginReducerを独立して使用する場合
    auth: loginReducer
  }
});

export const decorators = [
  (Story) => {
    const queryClient = new QueryClient();
    return (
      <ConfigProvider theme={Theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <GlobalStyle />
            <MemoryRouter initialEntries={['/path/DVLG']}>
              <Routes>
                <Route path="/path/:id" element={<Story />} />
              </Routes>
            </MemoryRouter>
          </Provider>
        </QueryClientProvider>
      </ConfigProvider>
    );
  }
];
