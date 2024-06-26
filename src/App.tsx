import { ConfigProvider } from 'antd';
import React from 'react';
import { Theme } from './constant/Theme';
import { AppRouter } from './route/Router';
import GlobalStyle from './constant/GlobalStyle';

export const App = (): React.JSX.Element => {
  return (
    <ConfigProvider theme={Theme}>
      <GlobalStyle />
      <AppRouter />
    </ConfigProvider>
  );
};
