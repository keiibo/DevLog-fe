import { Flex } from 'antd';
import React from 'react';
import {
  CategoryLabel,
  TCategoryLabelMode
} from '../../../../components/composition/categoryLabel/CategoryLabel';
import {
  mixinNormalFontSize16px,
  mixinPadding8px,
  mixinTextColor
} from '../../../../style/Mixin';
import { styled } from 'styled-components';

type TProps = {
  label: string;
  subText?: string;
  children: React.ReactNode;
  mode: TCategoryLabelMode;
  buttonTitle?: string;
  onButtonClick?: () => void;
  isButtonDisabled?: boolean;
};

export const Section = ({
  label,
  subText,
  children,
  mode,
  onButtonClick,
  buttonTitle,
  isButtonDisabled = false
}: TProps): React.JSX.Element => {
  return (
    <StyledFlex vertical gap={16}>
      <CategoryLabel
        label={label}
        subText={subText}
        mode={mode}
        onButtonClick={onButtonClick}
        buttonTitle={buttonTitle}
        isButtonDisabled={isButtonDisabled}
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
  ${mixinNormalFontSize16px}
  margin-left: 16px;
  max-width: 100%;
`;
