import { Flex } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { mixinNormalFontSize40px, mixinTextColor } from '../../../style/Mixin';
import { CloseCircleFilled } from '@ant-design/icons';
import { Divider } from '../divider/Divider';

type TProps = {
  title: string;
  hasCloseIcon: boolean;
  onClickCloseButton: () => void;
};

export const ModalHeader = ({
  title,
  hasCloseIcon,
  onClickCloseButton
}: TProps): React.JSX.Element => {
  return (
    <>
      <Flex justify="space-between">
        <StyledTitle>{title}</StyledTitle>
        {hasCloseIcon && (
          <StyledCloseCircleFilled onClick={onClickCloseButton} />
        )}
      </Flex>
      <Divider />
    </>
  );
};

const StyledTitle = styled.h1`
  ${mixinNormalFontSize40px}
  margin: 0;
`;

const StyledCloseCircleFilled = styled(CloseCircleFilled)`
  ${mixinNormalFontSize40px}
  ${mixinTextColor}
`;
