import { Flex } from 'antd';
import React from 'react';
import { NoteIcon } from '../elements/NoteIcon';
import { EllipsisOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import {
  mixinNormalFontSize12px,
  mixinNormalFontSize16px,
  mixinTextColor
} from '../../../../style/Mixin';

export const NoteListItem = (): React.JSX.Element => {
  const handleClick = () => {};
  return (
    <StyledFlex justify="space-between" align="center" onClick={handleClick}>
      <Flex align="center" gap={16}>
        <NoteIcon />
        <Flex vertical gap={4}>
          <StyledTitle>test</StyledTitle>
          <StyledDate>2024/12/31</StyledDate>
        </Flex>
      </Flex>
      <StyledEllipsisOutlined />
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  cursor: pointer;
`;

const StyledTitle = styled.span`
  ${mixinTextColor}
  ${mixinNormalFontSize16px}
`;

const StyledDate = styled.span`
  ${mixinTextColor}
  ${mixinNormalFontSize12px}
`;

const StyledEllipsisOutlined = styled(EllipsisOutlined)`
  cursor: pointer;
  ${mixinTextColor}
`;
