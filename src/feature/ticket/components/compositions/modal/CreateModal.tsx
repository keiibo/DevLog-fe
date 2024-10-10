import React, { useEffect, useRef, useState } from 'react';
import { Flex, InputRef, notification } from 'antd';
import { FormItem } from '../../../../../components/element/form/FormItem';
import { Input } from '../../../../../components/element/input/Input';
import { Button } from '../../../../../components/element/button/Button';
import { Status, TCategory, TCreateTicketReq } from '../../../types/TTicket';
import { mixinNormalFontSize16px } from '../../../../../style/Mixin';
import { styled } from 'styled-components';
import { Form } from '../../../../../components/element/form/Form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '../../../api/ticket';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { TicketProperty } from '../TicketProperty';
import { DateFormat } from '../../../../../constant/DateFormat';
import { Loading } from '../../../../../components/element/loading/Loading';
import { NOTIFICATION_TIME } from '../../../../../constant/Notification';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import { QueryKey } from '../../../../../constant/QueryKey';

type TProps = {
  isOpenedNewCreateModal: boolean;
  setIsOpenedNewCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateModal = ({
  isOpenedNewCreateModal,
  setIsOpenedNewCreateModal
}: TProps): React.JSX.Element => {
  const queryClient = useQueryClient();
  const [form] = useForm();
  const { id: projectId } = useParams();
  const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([]);
  const titleInputRef = useRef<InputRef>(null); // Input用のrefを作成

  useEffect(() => {
    // モーダルが開かれたときにタイトルのInputにフォーカスを設定
    if (isOpenedNewCreateModal) {
      setSelectedCategories([]);
      // フォームのフィールドをリセット
      form.resetFields();
      setTimeout(() => titleInputRef.current?.focus(), 100);
    }
  }, [isOpenedNewCreateModal]); // 依存配列にモーダルの状態を追加

  if (!projectId) {
    return <Loading />;
  }

  /**
   * チケットの新規作成送信処理
   */
  const handleSubmit = () => {
    const reqBody: TCreateTicketReq = {
      projectId,
      labelColorType: form.getFieldValue('labelColorType'),
      title: form.getFieldValue('title'),
      detail: form.getFieldValue('detail') || null,
      isDeletable: form.getFieldValue('status') === Status.COMPLETED || false,
      limitStartYm: form.getFieldValue('limitStartYm')
        ? form.getFieldValue('limitStartYm').format(DateFormat.HYPHEN)
        : null,
      limitEndYm: form.getFieldValue('limitEndYm')
        ? form.getFieldValue('limitEndYm').format(DateFormat.HYPHEN)
        : null,
      priority: form.getFieldValue('priority'),
      status: form.getFieldValue('status'),
      categories: selectedCategories,
      mileStoneUuid: form.getFieldValue('mileStone') || null,
      createdAt: new Date().toISOString(),
      completedAt:
        form.getFieldValue('status') === Status.COMPLETED
          ? new Date().toISOString()
          : null
    };

    mutation.mutate(reqBody);
  };

  /**
   * postMutation
   */
  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: (res) => {
      notification.success({
        message: 'チケットを作成しました',
        description: `タイトル: ${res.title}`,
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
      setIsOpenedNewCreateModal(false);
      queryClient.invalidateQueries({ queryKey: [QueryKey.TICKET_LIST] });
      form.resetFields();
      setSelectedCategories([]);
    },
    onError: () => {
      // エラー処理
      notification.error({
        message: 'チケット作成失敗',
        description: 'チケットの作成に失敗しました。再試行してください。',
        duration: NOTIFICATION_TIME.ERROR
      });
    }
  });

  // モーダルキャンセル時
  const handleCancel = (): void => {
    form.resetFields();
    setIsOpenedNewCreateModal(false);
  };

  return (
    <Modal
      open={isOpenedNewCreateModal}
      width={'800px'}
      footer={false}
      destroyOnClose
      closeIcon={false}
      onCancel={handleCancel}
    >
      <ModalHeader
        title={'チケットの新規作成'}
        hasCloseIcon
        onClickCloseButton={handleCancel}
      />
      <ModalBody>
        <Form onFinish={handleSubmit} form={form}>
          <Flex vertical gap={16}>
            <Flex vertical gap={8}>
              <StyledLabel>タイトル:</StyledLabel>
              <FormItem
                noStyle
                name={'title'}
                rules={[
                  {
                    required: true,
                    message: '必須項目です'
                  }
                ]}
              >
                <Input width={'100%'} ref={titleInputRef} />
              </FormItem>
            </Flex>
            <TicketProperty
              isEditMode
              ticket={null}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <Flex justify="center">
              <Button htmlType={'submit'} type="primary">
                作成
              </Button>
            </Flex>
          </Flex>
        </Form>
      </ModalBody>
    </Modal>
  );
};

const StyledLabel = styled.div`
  ${mixinNormalFontSize16px}
`;
