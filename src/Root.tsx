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
      <StyledFooter>DevLog ©2024 Created by keibo</StyledFooter>
    </Layout>
  );
};

const StyledContent = styled(Content)`
  background-color: ${Colors.MAIN};
  min-height: calc(100vh - ${LayoutNum.FOOTER_HEIGHT}px);
  color: ${Colors.TEXT};
  padding: calc(${LayoutNum.HEADER_HEIGHT}px + 16px) 64px
    calc(${LayoutNum.FOOTER_HEIGHT}px + 16px) 64px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  height: ${LayoutNum.HEADER_HEIGHT}px;
`;
