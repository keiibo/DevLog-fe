import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
  mixinBgTextDark,
  mixinBorderRadius8px,
  mixinPadding8px
} from '../../../../style/Mixin';
import { Flex } from 'antd';
import { Icon, TIconType } from '../../../../components/element/icon/Icon';
import { LinkIconSettingTooltip } from './LinkIconSettingTooltip';

type TProps = {
  type: TIconType;
  isInTooltip: boolean;
};

export const LinkIcon = ({ type, isInTooltip }: TProps): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleClick = () => {
    if (!isInTooltip) {
      setIsOpened(!isOpened);
    }
  };

  return (
    <StyledA>
      <StyledFlex
        justify="center"
        align="center"
        onClick={handleClick}
        $isInTooltip={isInTooltip}
      >
        <Icon type={type} />
      </StyledFlex>
      {isOpened && (
        <StyledSpan $isInTooltip={isInTooltip}>
          <LinkIconSettingTooltip></LinkIconSettingTooltip>
        </StyledSpan>
      )}
    </StyledA>
  );
};

const StyledA = styled.div`
  position: relative;
`;

const StyledFlex = styled(Flex)<{ $isInTooltip: boolean }>`
  width: 64px;
  height: 64px;
  cursor: pointer;
  ${mixinBgTextDark}
  ${mixinBorderRadius8px}
  ${mixinPadding8px}
`;

const StyledSpan = styled.span<{ $isInTooltip: boolean }>`
  ${({ $isInTooltip }) =>
    !$isInTooltip &&
    `
    position: absolute;
    width: fit-content;
    top: -200px;
    left: -140px;
  `}
`;
