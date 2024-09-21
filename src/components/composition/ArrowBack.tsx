import { ArrowLeftOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { mixinTextColor, mixinNormalFontSize16px } from '../../style/Mixin';

type TProps = {
  handleBack: () => void;
};

export const ArrowBack = ({ handleBack }: TProps): React.JSX.Element => {
  return (
    <StyledBackFlex gap={8} onClick={handleBack}>
      <ArrowLeftOutlined />
      戻る
    </StyledBackFlex>
  );
};
const StyledBackFlex = styled(Flex)`
  width: fit-content;
  cursor: pointer;
  ${mixinTextColor}
  ${mixinNormalFontSize16px}
`;
