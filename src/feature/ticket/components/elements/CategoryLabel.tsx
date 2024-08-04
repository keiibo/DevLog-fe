import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../../style/Colors';
import { Flex } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  mixinBgWhite,
  mixinBoldFontSize24px,
  mixinBorderRadius4px,
  mixinMainColor
} from '../../../../style/Mixin';

type TProps = {
  label: string;
  onClick: () => void;
  defaultOpenState: boolean;
};

export const CategoryLabel = ({
  label,
  onClick,
  defaultOpenState
}: TProps): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState(defaultOpenState);

  const toggleAccordion = () => {
    onClick();
    setIsOpened(!isOpened);
  };

  return (
    <StyledCategoryLabel onClick={toggleAccordion}>
      <Flex justify="space-between" align="center">
        <StyledLabel>{label}</StyledLabel>
        <StyledIcon rotate={isOpened ? 0 : 180}>
          <DownOutlined />
        </StyledIcon>
      </Flex>
    </StyledCategoryLabel>
  );
};

const StyledCategoryLabel = styled.div`
  padding: 8px 24px;
  border-left: 12px solid ${Colors.PURPLE};
  box-shadow: 4px 4px 4px 0 ${Colors.TEXT_DARK};
  cursor: pointer;

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
