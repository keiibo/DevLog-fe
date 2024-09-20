import React from 'react';
import styled from 'styled-components';
import {
  mixinBgWhite,
  mixinBorderRadius8px,
  mixinNormalFontSize24px
} from '../../../../style/Mixin';
import { EditOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

export const NoteIcon = (): React.JSX.Element => {
  return (
    <StyledNoteIcon justify="center" align="center">
      <StyledEditOutlined />
    </StyledNoteIcon>
  );
};

const StyledNoteIcon = styled(Flex)`
  width: 48px;
  height: 48px;
  ${mixinBorderRadius8px}
  ${mixinBgWhite}
`;

const StyledEditOutlined = styled(EditOutlined)`
  ${mixinNormalFontSize24px}
`;
