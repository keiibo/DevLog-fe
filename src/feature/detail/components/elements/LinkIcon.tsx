import React from 'react';
import { styled } from 'styled-components';
import {
  mixinBgTextDark,
  mixinBorderRadius8px,
  mixinPadding8px
} from '../../../../style/Mixin';
import { Flex } from 'antd';
import { Icon, TIconType } from '../../../../components/element/icon/Icon';

type TProps = {
  type: TIconType;
};

export const LinkIcon = ({ type }: TProps): React.JSX.Element => {
  const handleClick = () => {};

  return (
    <StyledFlex justify="center" onClick={handleClick}>
      <Icon type={type} />
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  width: 64px;
  height: 64px;

  ${mixinBgTextDark}
  ${mixinBorderRadius8px}
  ${mixinPadding8px}
`;
