import { ConfigProvider } from 'antd';
import React from 'react';
import { Theme } from './style/Theme';
import { AppRouter } from './route/Router';
import GlobalStyle from './style/GlobalStyle';

export const App = (): React.JSX.Element => {
  return (
    <ConfigProvider theme={Theme}>
      <GlobalStyle />
      <AppRouter />
    </ConfigProvider>
  );
};
