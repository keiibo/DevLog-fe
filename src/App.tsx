import { ConfigProvider } from 'antd';
import React from 'react';
import { Theme } from './constant/Theme';
import { AppRouter } from './route/Router';

export const App = (): React.JSX.Element => {
  return (
    <ConfigProvider theme={Theme}>
      <AppRouter />
    </ConfigProvider>
  );
};
