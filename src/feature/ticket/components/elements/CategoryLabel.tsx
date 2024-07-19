import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../../constant/Colors';
import { Flex } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  mixinBgWhite,
  mixinBoldFontSize24px,
  mixinBorderRadius12px,
  mixinMainText
} from '../../../../constant/Mixin';

type TProps = {
  label: string;
};

export const CategoryLabel = ({ label }: TProps): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleAccordion = () => {
    setIsOpened(!isOpened);
  };

  return (
    <StyledCategoryLabel onClick={toggleAccordion}>
      <Flex justify="space-between" align="center">
        <StyledLabel>{label}</StyledLabel>
        <StyledIcon rotate={isOpened ? 180 : 0}>
          <DownOutlined />
        </StyledIcon>
      </Flex>
    </StyledCategoryLabel>
  );
};

const StyledCategoryLabel = styled.div`
  padding: 8px 24px;
  border-left: 12px solid ${Colors.PURPLE};
  box-shadow: 4px 4px 4px 0 ${Colors.TEXT};
  cursor: pointer;

  ${mixinMainText}
  ${mixinBgWhite}
  ${mixinBorderRadius12px}
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
