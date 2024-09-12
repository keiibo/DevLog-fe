import { ConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import { Theme } from './style/Theme';
import { AppRouter } from './router/Router';
import GlobalStyle from './style/GlobalStyle';
import { Loading } from './components/element/loading/Loading';

export const App = (): React.JSX.Element => {
  return (
    <ConfigProvider theme={Theme}>
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>
    </ConfigProvider>
  );
};
