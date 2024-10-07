import React from 'react';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import { Flex } from 'antd';
import { Button } from '../../../../../components/element/button/Button';
import { styled } from 'styled-components';
import { mixinNormalFontSize24px } from '../../../../../style/Mixin';

type TProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  handleOpenNewMileStoneModal: () => void;
  handleOpenEditMileStoneModal: () => void;
};

export const MileStoneSelectModal = ({
  isOpened,
  setIsOpened,
  title,
  handleOpenNewMileStoneModal,
  handleOpenEditMileStoneModal
}: TProps): React.JSX.Element => {
  return (
    <Modal
      open={isOpened}
      footer={false}
      width={800}
      destroyOnClose
      closeIcon={false}
      onCancel={() => {
        setIsOpened(false);
      }}
    >
      <ModalHeader
        title={title}
        hasCloseIcon
        onClickCloseButton={() => {
          setIsOpened(false);
        }}
      />
      <ModalBody>
        <Flex vertical gap={16}>
          <StyledSubTitle>どちらの設定を行いますか？</StyledSubTitle>
          <Flex justify="center" gap={8}>
            <Button type="primary" onClick={handleOpenNewMileStoneModal}>
              新規マイルストーンの作成
            </Button>
            <Button type="primary" onClick={handleOpenEditMileStoneModal}>
              設定済みマイルストーンを編集
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </Modal>
  );
};
const StyledSubTitle = styled.h3`
  ${mixinNormalFontSize24px}
  font-weight: 100;
  margin: 0;
`;
