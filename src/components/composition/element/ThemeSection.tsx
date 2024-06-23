import { Flex } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { Colors } from '../../../constant/Colors';
import { MultiLineText } from '../MultiLineText';

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
      <StyledImageContainer>
        <img src={imageUrl} alt={imageAlt} width={'100px'} height={'100px'} />
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

const StyledImageContainer = styled.div`
  min-width: 200px;
  min-height: 200px;
  display: flex;
  background-color: ${Colors.MAIN_LIGHT};
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.h2`
  color: ${Colors.WHITE};
  font-size: 40px;
  font-weight: bold;
  padding: 8px;
  margin: 0;
`;
const StyledDescription = styled.p`
  color: ${Colors.TEXT};
  font-size: 16px;
  padding: 8px;
  margin: 0;
`;
