import { TabsProps } from 'antd';
import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import { Tab } from '../../../../../components/element/tab/Tab';
import { CategoryTabItem } from '../tabItem/CategoryTabItem';
import { TemplateTabItem } from '../tabItem/TemplateTabItem';

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
  const [categoryForm] = useForm();
  const [templateForm] = useForm();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'カテゴリ',
      children: <CategoryTabItem form={categoryForm} />
    },
    {
      key: '2',
      label: 'テンプレート',
      children: <TemplateTabItem form={templateForm} />
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
        categoryForm.resetFields();
        templateForm.resetFields();
      }}
    >
      <ModalHeader
        title={title}
        hasCloseIcon
        onClickCloseButton={() => {
          setIsOpened(false);
          categoryForm.resetFields();
          templateForm.resetFields();
        }}
      />
      <ModalBody>
        <Tab items={items}></Tab>
      </ModalBody>
    </Modal>
  );
};
