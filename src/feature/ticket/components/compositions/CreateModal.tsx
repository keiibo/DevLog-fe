import React from 'react';
import { Flex, Modal, notification } from 'antd';
import DatePicker from '../../../../components/element/datepicker/DatePicker';
import { FormItem } from '../../../../components/element/form/FormItem';
import { Input } from '../../../../components/element/input/Input';
import { Button } from '../../../../components/element/button/Button';
import { Textarea } from '../../../../components/element/textarea/Textarea';
import {
  LabelColorType,
  Priority,
  Status,
  TCreateTicketReq
} from '../../types/TTicket';
import { mixinNormalFontSize24px } from '../../../../constant/Mixin';
import { Select } from '../../../../components/element/select/Select';
import { Option } from '../../../../components/element/select/Option';
import { styled } from 'styled-components';
import { Form } from '../../../../components/element/form/Form';
import { useMutation, useQueryClient } from 'react-query';
import { createTicket } from '../../api/ticket';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';

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
  if (!projectId) {
    return <div>Loading</div>;
  }

  const priorityOption = [
    { label: '高', value: Priority.HIGH },
    { label: '中', value: Priority.MEDIUM },
    { label: '低', value: Priority.LOW }
  ];
  const statusOption = [
    { label: '未着手', value: Status.NOT_STARTED },
    { label: '着手中', value: Status.UNDER_CONSTRUCTION },
    { label: '完了', value: Status.COMPLETED }
  ];
  const labelColorTypeOption = [
    { label: '青', value: LabelColorType.BLUE },
    { label: '赤', value: LabelColorType.RED },
    { label: '水色', value: LabelColorType.LIGHT_BLUE },
    { label: '白', value: LabelColorType.WHITE }
  ];

  /**
   * チケットの新規作成送信処理
   */
  const handleSubmit = () => {
    console.log(form.getFieldsValue());
    const reqBody: TCreateTicketReq = {
      projectId,
      labelColorType: form.getFieldValue('labelColorType'),
      title: form.getFieldValue('title'),
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
    },
    onError: (error) => {
      console.log(error);
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
          <Flex vertical>
            <StyledLabel>詳細:</StyledLabel>
            <FormItem noStyle name={'detail'}>
              <Textarea
                autoSize={{
                  minRows: 12
                }}
              />
            </FormItem>
          </Flex>
          <Flex gap={18} justify="space-between">
            <Flex flex={5} align="center" justify="space-between">
              <StyledLabel>優先度:</StyledLabel>
              <FormItem
                noStyle
                name={'priority'}
                rules={[
                  {
                    required: true,
                    message: '必須項目です'
                  }
                ]}
              >
                <StyledSelect>
                  {priorityOption.map((priority) => {
                    return (
                      <Option key={priority.value} value={priority.value}>
                        {priority.label}
                      </Option>
                    );
                  })}
                </StyledSelect>
              </FormItem>
            </Flex>
            <Flex flex={5} align="center" justify="space-between">
              <StyledLabel>ステータス:</StyledLabel>
              <FormItem
                noStyle
                name={'status'}
                rules={[
                  {
                    required: true,
                    message: '必須項目です'
                  }
                ]}
              >
                <StyledSelect>
                  {statusOption.map((status) => {
                    return (
                      <Option key={status.value} value={status.value}>
                        {status.label}
                      </Option>
                    );
                  })}
                </StyledSelect>
              </FormItem>
            </Flex>
          </Flex>
          <Flex gap={18} justify="space-between">
            <Flex flex={5} align="center" justify="space-between">
              <StyledLabel>期限日:</StyledLabel>
              <Flex gap={4} align="center">
                <FormItem noStyle name={'limitStartYm'}>
                  <DatePicker format={'YYYY/MM/DD'} />
                </FormItem>
                ~
                <FormItem noStyle name={'limitEndYm'}>
                  <DatePicker format={'YYYY/MM/DD'} />
                </FormItem>
              </Flex>
            </Flex>
            <Flex flex={5} align="center" justify="space-between">
              <StyledLabel>ラベルカラー:</StyledLabel>
              <FormItem
                noStyle
                name={'labelColorType'}
                rules={[
                  {
                    required: true,
                    message: '必須項目です'
                  }
                ]}
              >
                <StyledSelect>
                  {labelColorTypeOption.map((labelColorType) => {
                    return (
                      <Option
                        key={labelColorType.value}
                        value={labelColorType.value}
                      >
                        {labelColorType.label}
                      </Option>
                    );
                  })}
                </StyledSelect>
              </FormItem>
            </Flex>
          </Flex>
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

const StyledSelect = styled(Select)`
  width: 200px;
`;
