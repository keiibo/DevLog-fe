import { Flex } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { mixinNormalFontSize40px, mixinTextColor } from '../../../style/Mixin';
import { ArrowLeftOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Divider } from '../divider/Divider';

type TProps = {
  title: string;
  hasCloseIcon: boolean;
  hasBack?: boolean;
  onClickCloseButton: () => void;
  onClickBack?: () => void;
};

export const ModalHeader = ({
  title,
  hasCloseIcon,
  hasBack,
  onClickCloseButton,
  onClickBack
}: TProps): React.JSX.Element => {
  return (
    <>
      <Flex justify="space-between">
        <StyledTitle>
          {hasBack && onClickBack && (
            <StyledArrowLeftOutlined onClick={onClickBack} />
          )}
          {title}
        </StyledTitle>
        {hasCloseIcon && (
          <StyledCloseCircleFilled onClick={onClickCloseButton} />
        )}
      </Flex>
      <Divider />
    </>
  );
};

const StyledTitle = styled.h1`
  font-weight: 100;
  ${mixinNormalFontSize40px}
  margin: 0;
`;

const StyledCloseCircleFilled = styled(CloseCircleFilled)`
  ${mixinNormalFontSize40px}
  ${mixinTextColor}
`;

const StyledArrowLeftOutlined = styled(ArrowLeftOutlined)`
  cursor: pointer;
  margin-right: 4px;
`;
