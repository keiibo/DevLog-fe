import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Theme } from '../src/constant/Theme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Colors } from '../src/constant/Colors';
import GlobalStyle from '../src/constant/GlobalStyle';

export const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'main', // デフォルトの背景色を設定
      values: [
        { name: 'initial', value: '#ffffff' },
        { name: 'main', value: Colors.MAIN }
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

export const decorators = [
  (Story) => (
    <ConfigProvider theme={Theme}>
      <MemoryRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    </ConfigProvider>
  )
];
