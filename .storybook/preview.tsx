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

export const preview: Preview = {
  parameters: {
    // TODO.適用されてない
    backgrounds: {
      default: 'white',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    },
    actions: { argTypeRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  tags: ['autodocs']
};

const store = configureStore({
  reducer: {
    // loginReducerを独立して使用する場合
    auth: loginReducer
  }
});

export const decorators = [
  (Story) => (
    <ConfigProvider theme={Theme}>
      <Provider store={store}>
        <MemoryRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ConfigProvider>
  )
];
