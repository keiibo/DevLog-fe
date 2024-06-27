import React from 'react';
import { Tabs as AntDTabs } from 'antd';
import { TabsProps } from 'antd/es/tabs';
import { styled } from 'styled-components';
import { Colors } from '../../../constant/Colors';

type TProps = TabsProps;
export const Tab = ({ ...props }: TProps): React.JSX.Element => {
  return <StyledAntDTabs {...props}></StyledAntDTabs>;
};

const StyledAntDTabs = styled(AntDTabs)`
  .ant-tabs-nav {
    margin: 0;

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
    color: ${Colors.TEXT};
    border: none !important;
    font-weight: bold;
    font-size: 24px !important;
    letter-spacing: 1px;
    background-color: ${Colors.PURPLE} !important;
    &-active {
      background-color: ${Colors.TEXT} !important;
      .ant-tabs-tab-btn {
        color: ${Colors.MAIN} !important;
      }
    }
  }
`;
