import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import {
  mixinBgTextDark,
  mixinBorderRadius8px,
  mixinPadding8px
} from '../../../../style/Mixin';
import { Flex } from 'antd';
import {
  Icon,
  IconType,
  TIconType
} from '../../../../components/element/icon/Icon';
import { LinkIconSettingTooltip } from './LinkIconSettingTooltip';

type TProps = {
  type: TIconType;
  isInTooltip: boolean;
  mainView?: DOMRect;
  link?: string;
};

export const LinkIcon = ({
  type,
  isInTooltip,
  mainView,
  link
}: TProps): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: -200, left: -140 });
  const ref = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (link) {
      window.open(link);
      return;
    }
    if (!isInTooltip && mainView) {
      const initialTooltipPosition = iconRef.current?.getBoundingClientRect();
      if (!initialTooltipPosition) return;

      const { left, right } = mainView;
      let leftView = left + 16;
      // rightの飛び出しを防止
      if (initialTooltipPosition.right + 360 > right) {
        leftView = leftView - 360;
      }

      setTooltipPosition({ top: -200, left: leftView });
    }
    setIsOpened(!isOpened);
  };

  return (
    <StyledBox ref={iconRef}>
      <StyledFlex
        justify="center"
        align="center"
        onClick={handleClick}
        $isInTooltip={isInTooltip}
      >
        <Icon type={type} />
      </StyledFlex>
      {isOpened && type === IconType.PLUS && (
        <StyledSpan
          ref={ref}
          $isInTooltip={isInTooltip}
          $tooltipPosition={tooltipPosition}
        >
          <LinkIconSettingTooltip />
        </StyledSpan>
      )}
    </StyledBox>
  );
};

const StyledBox = styled.div`
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

const StyledSpan = styled.span<{
  $isInTooltip: boolean;
  $tooltipPosition: {
    top: number;
    left: number;
  };
}>`
  ${({ $isInTooltip, $tooltipPosition }) =>
    !$isInTooltip &&
    `
    position: absolute;
    top: ${$tooltipPosition.top}px;
    left: ${$tooltipPosition.left}px;
    
  `}

  z-index: 99999;
`;
