import React from 'react';
import { Tabs as AntDTabs } from 'antd';
import { TabsProps } from 'antd/es/tabs';
import { styled } from 'styled-components';
import { mixinBoldFontSize16px } from '../../../style/Mixin';

type TProps = TabsProps;
export const Tab = ({ ...props }: TProps): React.JSX.Element => {
  return <StyledAntDTabs {...props}></StyledAntDTabs>;
};

const StyledAntDTabs = styled(AntDTabs)`
  .ant-tabs-tab {
    justify-content: center;
    border: none !important;
    ${mixinBoldFontSize16px}
  }
`;
