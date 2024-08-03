import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Colors } from '../src/style/Colors';
import { Theme } from '../src/style/Theme';
import GlobalStyle from '../src/style/GlobalStyle';

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
