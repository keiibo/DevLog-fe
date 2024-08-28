import { Flex } from 'antd';
import React from 'react';
import {
  CategoryLabel,
  TCategoryLabelMode
} from '../../../../components/composition/categoryLabel/CategoryLabel';
import {
  mixinNormalFontSize24px,
  mixinPadding8px,
  mixinTextColor
} from '../../../../style/Mixin';
import { styled } from 'styled-components';

type TProps = {
  label: string;
  children: React.ReactNode;
  mode: TCategoryLabelMode;
  buttonTitle?: string;
  onButtonClick?: () => void;
};

export const Section = ({
  label,
  children,
  mode,
  onButtonClick,
  buttonTitle
}: TProps): React.JSX.Element => {
  return (
    <StyledFlex vertical gap={16}>
      <CategoryLabel
        label={label}
        mode={mode}
        onButtonClick={onButtonClick}
        buttonTitle={buttonTitle}
      />
      <StyledSectionContent>{children}</StyledSectionContent>
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  ${mixinPadding8px}
`;

const StyledSectionContent = styled.span`
  ${mixinTextColor}
  ${mixinNormalFontSize24px}
  margin-left: 16px;
`;
