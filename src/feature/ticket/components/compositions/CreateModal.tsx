import React from 'react';
import { Flex, Modal, notification } from 'antd';
import { FormItem } from '../../../../components/element/form/FormItem';
import { Input } from '../../../../components/element/input/Input';
import { Button } from '../../../../components/element/button/Button';
import { Status, TCreateTicketReq } from '../../types/TTicket';
import { mixinNormalFontSize24px } from '../../../../style/Mixin';
import { styled } from 'styled-components';
import { Form } from '../../../../components/element/form/Form';
import { useMutation, useQueryClient } from 'react-query';
import { createTicket } from '../../api/ticket';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { TicketProperty } from './TicketProperty';

type TProps = {
  isOpenedNewCreateModal: boolean;
  setIsOpenedNewCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO 詳細と共通のコンポジションにできる
export const CreateModal = ({
  isOpenedNewCreateModal,
  setIsOpenedNewCreateModal
}: TProps): React.JSX.Element => {
  const queryClient = useQueryClient();
  const [form] = useForm();
  const { id: projectId } = useParams();
  if (!projectId) {
    return <div>Loading</div>;
  }

  /**
   * チケットの新規作成送信処理
   */
  const handleSubmit = () => {
    const reqBody: TCreateTicketReq = {
      projectId,
      labelColorType: form.getFieldValue('labelColorType'),
      title: form.getFieldValue('title'),
      detail: form.getFieldValue('detail'),
      isDeletable: form.getFieldValue('status') === Status.COMPLETED || false,
      limitStartYm: form.getFieldValue('limitStartYm')
        ? form.getFieldValue('limitStartYm').format('YYYY-MM-DD')
        : null,
      limitEndYm: form.getFieldValue('limitEndYm')
        ? form.getFieldValue('limitEndYm').format('YYYY-MM-DD')
        : null,
      priority: form.getFieldValue('priority'),
      status: form.getFieldValue('status')
    };
    mutation.mutate(reqBody);
  };

  /**
   * postMutation
   */
  const mutation = useMutation(createTicket, {
    onSuccess: (res) => {
      notification.success({
        message: 'チケットを作成しました',
        description: `タイトル: ${res.title}`,
        duration: 3 // 通知が表示される時間（秒）
      });
      setIsOpenedNewCreateModal(false);
      queryClient.invalidateQueries('tickets');
      form.resetFields();
    },
    onError: () => {
      // エラー処理
      notification.error({
        message: 'チケット作成失敗',
        description: 'チケットの作成に失敗しました。再試行してください。',
        duration: 3
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
      onCancel={handleCancel}
      width={'80%'}
      title={'チケットの新規作成'}
      footer={false}
      destroyOnClose
    >
      <Form onFinish={handleSubmit} form={form}>
        <Flex vertical gap={18}>
          <Flex vertical>
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
              <Input width={'100%'} />
            </FormItem>
          </Flex>
          <TicketProperty isEditMode={true} ticket={null} />

          <Flex justify="center">
            <Button htmlType={'submit'} type="primary">
              作成
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};

const StyledLabel = styled.div`
  ${mixinNormalFontSize24px}
`;
