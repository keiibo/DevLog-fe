import React from 'react';
import { Flex, Modal } from 'antd';
import DatePicker from '../../../../components/element/datepicker/DatePicker';
import { FormItem } from '../../../../components/element/form/FormItem';
import { Input } from '../../../../components/element/input/Input';
import { Button } from '../../../../components/element/button/Button';
import { Textarea } from '../../../../components/element/textarea/Textarea';
import { LabelColorType, Priority, Status } from '../../types/TTicket';
import { mixinNormalFontSize24px } from '../../../../constant/Mixin';
import { Select } from '../../../../components/element/select/Select';
import { Option } from '../../../../components/element/select/Option';
import { styled } from 'styled-components';

type TProps = {
  isOpenedNewCreateModal: boolean;
  handleCancel: () => void;
};

export const CreateModal = ({
  isOpenedNewCreateModal,
  handleCancel
}: TProps): React.JSX.Element => {
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
  return (
    <Modal
      open={isOpenedNewCreateModal}
      onCancel={handleCancel}
      width={'80%'}
      title={'チケットの新規作成'}
      footer={false}
    >
      <Flex vertical gap={18}>
        <Flex vertical>
          <StyledLabel>タイトル:</StyledLabel>
          <FormItem noStyle>
            <Input width={'100%'} />
          </FormItem>
        </Flex>
        <Flex vertical>
          <StyledLabel>詳細:</StyledLabel>
          <FormItem noStyle>
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
            <FormItem noStyle>
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
            <FormItem noStyle>
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
              <FormItem noStyle>
                <DatePicker format={'YYYY/MM/DD'} />
              </FormItem>
              ~
              <FormItem noStyle>
                <DatePicker format={'YYYY/MM/DD'} />
              </FormItem>
            </Flex>
          </Flex>
          <Flex flex={5} align="center" justify="space-between">
            <StyledLabel>ラベルカラー:</StyledLabel>
            <FormItem noStyle>
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
          <Button type="primary">作成</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

const StyledLabel = styled.div`
  ${mixinNormalFontSize24px}
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;
