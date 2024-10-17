import { TabsProps } from 'antd';
import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import { Tab } from '../../../../../components/element/tab/Tab';
import { CategoryTabItem } from '../tabItem/CategoryTabItem';

type TProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

export const SettingModal = ({
  isOpened,
  setIsOpened,
  title
}: TProps): React.JSX.Element => {
  const [form] = useForm();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'カテゴリ',
      children: <CategoryTabItem form={form} />
    },
    {
      key: '2',
      label: 'テンプレート'
    }
  ];

  return (
    <Modal
      open={isOpened}
      footer={false}
      width={800}
      destroyOnClose
      closeIcon={false}
      onCancel={() => {
        setIsOpened(false);
        form.resetFields();
      }}
    >
      <ModalHeader
        title={title}
        hasCloseIcon
        onClickCloseButton={() => {
          setIsOpened(false);
          form.resetFields();
        }}
      />
      <ModalBody>
        <Tab items={items}></Tab>
      </ModalBody>
    </Modal>
  );
};
