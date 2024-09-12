import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../style/Colors';
import { Flex } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  mixinBgWhite,
  mixinBoldFontSize24px,
  mixinBorderRadius4px,
  mixinMainColor
} from '../../../style/Mixin';
import { TValueOf } from '../../../lib/type';
import { Button } from '../../element/button/Button';

export const CategoryLabelMode = {
  ACCORDION: 'accordion',
  BUTTON: 'button',
  NONE: 'none'
} as const;

export type TCategoryLabelMode = TValueOf<typeof CategoryLabelMode>;

type TProps = {
  label: string;
  onClick?: () => void;
  defaultOpenState?: boolean;
  mode: TCategoryLabelMode;
  buttonTitle?: string;
  onButtonClick?: () => void;
  isButtonDisabled?: boolean;
};

export const CategoryLabel = ({
  label,
  onClick,
  defaultOpenState = false,
  mode,
  buttonTitle,
  onButtonClick,
  isButtonDisabled = false
}: TProps): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState(defaultOpenState);

  const toggleAccordion = () => {
    if (onClick) onClick();
    setIsOpened(!isOpened);
  };

  return (
    <StyledCategoryLabel onClick={toggleAccordion} $mode={mode}>
      <Flex justify="space-between" align="center">
        <StyledLabel>{label}</StyledLabel>
        {mode === CategoryLabelMode.ACCORDION && (
          <StyledIcon rotate={isOpened ? 0 : 180}>
            <DownOutlined />
          </StyledIcon>
        )}
        {mode === CategoryLabelMode.BUTTON && buttonTitle && onButtonClick && (
          <Button
            type={'primary'}
            onClick={onButtonClick}
            disabled={isButtonDisabled}
          >
            {buttonTitle}
          </Button>
        )}
      </Flex>
    </StyledCategoryLabel>
  );
};

const StyledCategoryLabel = styled.div<{
  $mode: string;
}>`
  width: 100%;
  padding: 8px 24px;
  border-left: 12px solid ${Colors.PURPLE};
  box-shadow: 4px 4px 4px 0 ${Colors.TEXT_DARK};

  cursor: ${({ $mode }) =>
    $mode === CategoryLabelMode.ACCORDION ? 'pointer' : 'default'};

  ${mixinMainColor}
  ${mixinBgWhite} 
  ${mixinBorderRadius4px}
`;

const StyledLabel = styled.div`
  ${mixinBoldFontSize24px}
`;

type TStyledIconProps = {
  rotate: number;
};

const StyledIcon = styled.div<TStyledIconProps>`
  transition: transform 0.4s;
  transform: rotate(${(props) => props.rotate}deg);
`;
