import { Flex, Image } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { MultiLineText } from '../MultiLineText';
import {
  mixinBgMainLight,
  mixinBoldFontSize40px,
  mixinBorderRadius8px,
  mixinMargin0,
  mixinNormalFontSize16px,
  mixinPadding8px,
  mixinTextColor,
  mixinWhiteColor
} from '../../../style/Mixin';

type TProps = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
};

export const ThemeSection = ({
  imageUrl,
  imageAlt,
  title,
  description
}: TProps): React.JSX.Element => {
  return (
    <Flex align="center" gap={56}>
      <StyledImageContainer align="center" justify="center">
        <Image
          preview={false}
          src={imageUrl}
          alt={imageAlt}
          width={'100px'}
          height={'100px'}
        />
      </StyledImageContainer>
      <Flex vertical gap={16}>
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>
          <MultiLineText text={description} />
        </StyledDescription>
      </Flex>
    </Flex>
  );
};

const StyledImageContainer = styled(Flex)`
  min-width: 200px;
  min-height: 200px;
  text-align: center;

  ${mixinBgMainLight}
  ${mixinBorderRadius8px}
`;

const StyledTitle = styled.h2`
  ${mixinBoldFontSize40px}
  ${mixinMargin0}
  ${mixinWhiteColor}
  ${mixinPadding8px}
`;
const StyledDescription = styled.p`
  ${mixinNormalFontSize16px}
  ${mixinMargin0}
  ${mixinTextColor}
  ${mixinPadding8px}
`;
