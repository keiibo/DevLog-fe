import React from 'react';
import { GlobalHeader } from './components/composition/GlobalHeader';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { Content, Footer } from 'antd/es/layout/layout';
import { Colors } from './constant/Colors';
import { LayoutNum } from './constant/LayoutNum';

export const Root = (): React.JSX.Element => {
  return (
    <Layout>
      <GlobalHeader />
      <StyledContent>
        <Outlet />
      </StyledContent>
      <StyledFooter>Ant Design ©2018 Created by Ant UED</StyledFooter>
    </Layout>
  );
};

const StyledContent = styled(Content)`
  background-color: ${Colors.MAIN};
  min-height: calc(
    100vh - ${LayoutNum.HEADER_HEIGHT}px - ${LayoutNum.FOOTER_HEIGHT}px
  );
  color: ${Colors.TEXT};
  padding: 32px 124px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;
