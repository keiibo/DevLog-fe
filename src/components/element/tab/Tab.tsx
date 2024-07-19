import React from 'react';
import { Tabs as AntDTabs } from 'antd';
import { TabsProps } from 'antd/es/tabs';
import { styled } from 'styled-components';
import { mixinBoldFontSize24px, mixinMargin0 } from '../../../constant/Mixin';

type TProps = TabsProps;
export const Tab = ({ ...props }: TProps): React.JSX.Element => {
  return <StyledAntDTabs {...props}></StyledAntDTabs>;
};

const StyledAntDTabs = styled(AntDTabs)`
  .ant-tabs-nav {
    ${mixinMargin0}
    &:before {
      border: none;
    }
  }

  .ant-tabs-nav-list {
    gap: 2px;
  }

  .ant-tabs-tab {
    min-width: 200px;
    min-height: 64px;
    justify-content: center;
    border: none !important;
    letter-spacing: 1px;
    ${mixinBoldFontSize24px}
  }
`;
