import { Flex, Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';
import {
  mixinDangerColor,
  mixinNormalFontSize16px,
  mixinNormalFontSize24px,
  mixinPadding24px
} from '../../../style/Mixin';
import { Button } from '../../element/button/Button';

type TProps = {
  isOpened: boolean;
  confirmMessage: string;
  handleClose: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  /**
   * pxで入力
   */
  width: string;
};

export const ConfirmDeleteModal = ({
  isOpened,
  confirmMessage,
  handleClose,
  handleCancel,
  handleDelete,
  width
}: TProps): React.JSX.Element => {
  const deleteSvg = `/assets/AiOutlineDelete.svg`;

  return (
    <StyledModal
      centered
      open={isOpened}
      onClose={handleClose}
      onCancel={handleCancel}
      footer={false}
      width={width}
      destroyOnClose
      closable={false}
    >
      <StyledContent $deleteSvg={deleteSvg}>
        <Flex vertical gap={16}>
          <Flex vertical gap={4}>
            <StyledConfirmMessage>{confirmMessage}</StyledConfirmMessage>
            <StyledSubMessage>この操作は元に戻せません</StyledSubMessage>
          </Flex>
          <StyledFlex gap={8} justify="center">
            <Button type="primary" onClick={handleCancel}>
              キャンセル
            </Button>
            <Button type="primary" onClick={handleDelete}>
              削除
            </Button>
          </StyledFlex>
        </Flex>
      </StyledContent>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  align-items: center;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 0;
`;

const StyledContent = styled.div<{ $deleteSvg: string }>`
  overflow: hidden;
  ${mixinPadding24px}
  &::before {
    z-index: 0;
    overflow: hidden;
    content: '';
    position: absolute;
    top: 30%;
    left: 35%;
    width: 90%; // サイズを大きくして完全にカバー
    height: 90%;
    background: url(${(props) => props.$deleteSvg}) no-repeat left center;
    background-size: contain;
    transform: translate(-50%, -50%) rotate(-15deg); //
  }
  &::after {
    z-index: 0;
    overflow: hidden;
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 100%; // サイズを大きくして完全にカバー
    height: 100%;
    background: url(${(props) => props.$deleteSvg}) no-repeat center center;
    background-size: contain;
    transform: translate(50%, 50%) rotate(15deg); //
  }
`;

const StyledConfirmMessage = styled.div`
  text-align: center;
  justify-content: center;
  z-index: 2;

  ${mixinNormalFontSize24px}
`;

const StyledSubMessage = styled.div`
  text-align: center;
  justify-content: center;
  z-index: 2;

  ${mixinNormalFontSize16px}
  ${mixinDangerColor}
`;

const StyledFlex = styled(Flex)`
  z-index: 2;
`;
