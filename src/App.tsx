import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { Theme } from './constant/Theme';

export const App = (): React.JSX.Element => {
  return (
    <ConfigProvider theme={Theme}>
      <Layout>fdf</Layout>
    </ConfigProvider>
  );
};
