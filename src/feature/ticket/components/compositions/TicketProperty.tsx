import React, { SetStateAction, useState } from 'react';
import { Textarea } from '../../../../components/element/textarea/Textarea';
import {
  LabelColorType,
  Priority,
  Status,
  TLabelColorType,
  TTicket
} from '../../types/TTicket';
import { FormItem } from '../../../../components/element/form/FormItem';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import DatePicker from '../../../../components/element/datepicker/DatePicker';
import { DateFormat } from '../../../../constant/DateFormat';
import { styled } from 'styled-components';
import {
  mixinNormalFontSize24px,
  mixinPadding8px
} from '../../../../style/Mixin';
import { Select } from '../../../../components/element/select/Select';
import { Option } from '../../../../components/element/select/Option';
import { MultiLineText } from '../../../../components/composition/MultiLineText';
import { getPriorityStr } from '../../lib/priority';
import { Colors } from '../../../../style/Colors';
import { getLabelColorStr } from '../../lib/labelColor';
import { getStatusStr } from '../../lib/status';

type TProps = {
  isEditMode: boolean;
  ticket: TTicket | null;
  setLabelColor?: React.Dispatch<SetStateAction<TLabelColorType | undefined>>;
};

export const TicketProperty = ({
  isEditMode,
  ticket,
  setLabelColor
}: TProps): React.JSX.Element => {
  const [starYm, setStartYm] = useState(
    ticket ? dayjs(ticket.limitStartYm) : undefined
  );
  const priorityOption = [
    { label: getPriorityStr(Priority.HIGH), value: Priority.HIGH },
    { label: getPriorityStr(Priority.MEDIUM), value: Priority.MEDIUM },
    { label: getPriorityStr(Priority.LOW), value: Priority.LOW }
  ];
  const statusOption = [
    { label: getStatusStr(Status.NOT_STARTED), value: Status.NOT_STARTED },
    {
      label: getStatusStr(Status.UNDER_CONSTRUCTION),
      value: Status.UNDER_CONSTRUCTION
    },
    { label: getStatusStr(Status.COMPLETED), value: Status.COMPLETED }
  ];
  const labelColorTypeOption = [
    {
      label: getLabelColorStr(LabelColorType.WHITE),
      value: LabelColorType.WHITE
    },
    {
      label: getLabelColorStr(LabelColorType.RED),
      value: LabelColorType.RED
    },
    {
      label: getLabelColorStr(LabelColorType.BLUE),
      value: LabelColorType.BLUE
    },
    {
      label: getLabelColorStr(LabelColorType.LIGHT_BLUE),
      value: LabelColorType.LIGHT_BLUE
    },
    {
      label: getLabelColorStr(LabelColorType.GREEN),
      value: LabelColorType.GREEN
    },
    {
      label: getLabelColorStr(LabelColorType.PURPLE),
      value: LabelColorType.PURPLE
    }
  ];

  const handleLabelColorChange = (value: TLabelColorType) => {
    if (setLabelColor) {
      setLabelColor(value);
    }
  };

  return (
    <>
      {isEditMode ? (
        <FormItem name={'detail'} noStyle initialValue={ticket?.detail}>
          <Textarea
            autoSize={{
              minRows: 18
            }}
          />
        </FormItem>
      ) : (
        <StyledDetailBox>
          <MultiLineText text={ticket?.detail || ''} />
        </StyledDetailBox>
      )}
      <Flex gap={18} justify="space-between">
        <Flex flex={5} align="center" justify="space-between">
          <StyledLabel>優先度:</StyledLabel>
          <FormItem
            noStyle
            initialValue={ticket?.priority || Priority.MEDIUM}
            name={'priority'}
            rules={[
              {
                required: true,
                message: '必須項目です'
              }
            ]}
          >
            {isEditMode ? (
              <StyledSelect>
                {priorityOption.map((priority) => {
                  return (
                    <Option key={priority.value} value={priority.value}>
                      {priority.label}
                    </Option>
                  );
                })}
              </StyledSelect>
            ) : (
              getPriorityStr(ticket?.priority || '')
            )}
          </FormItem>
        </Flex>
        <Flex flex={5} align="center" justify="space-between">
          <StyledLabel>ステータス:</StyledLabel>
          <FormItem
            noStyle
            initialValue={ticket?.status || Status.NOT_STARTED}
            name={'status'}
            rules={[
              {
                required: true,
                message: '必須項目です'
              }
            ]}
          >
            {isEditMode ? (
              <StyledSelect>
                {statusOption.map((status) => {
                  return (
                    <Option key={status.value} value={status.value}>
                      {status.label}
                    </Option>
                  );
                })}
              </StyledSelect>
            ) : (
              getStatusStr(ticket?.status || '')
            )}
          </FormItem>
        </Flex>
      </Flex>
      <Flex gap={18} justify="space-between">
        <Flex flex={5} align="center" justify="space-between">
          <StyledLabel>期限日:</StyledLabel>
          <Flex gap={4} align="center">
            <FormItem
              noStyle
              name={'limitStartYm'}
              initialValue={
                ticket?.limitStartYm ? dayjs(ticket.limitStartYm) : undefined
              }
            >
              {isEditMode ? (
                <DatePicker
                  format={DateFormat.SLASH}
                  onChange={(value) => setStartYm(value)}
                />
              ) : ticket?.limitStartYm ? (
                dayjs(ticket.limitStartYm).format(DateFormat.SLASH)
              ) : (
                ''
              )}
            </FormItem>
            {isEditMode || ticket?.limitStartYm || ticket?.limitEndYm ? (
              <span>~</span>
            ) : (
              <span>期限日無し</span>
            )}
            <FormItem
              noStyle
              name={'limitEndYm'}
              initialValue={
                ticket?.limitEndYm ? dayjs(ticket.limitEndYm) : undefined
              }
            >
              {isEditMode ? (
                <DatePicker format={DateFormat.SLASH} minDate={starYm} />
              ) : ticket?.limitEndYm ? (
                dayjs(ticket.limitEndYm).format(DateFormat.SLASH)
              ) : (
                ''
              )}
            </FormItem>
          </Flex>
        </Flex>
        <Flex flex={5} align="center" justify="space-between">
          <StyledLabel>ラベルカラー:</StyledLabel>
          <FormItem
            noStyle
            initialValue={ticket?.labelColorType || LabelColorType.BLUE}
            name={'labelColorType'}
            rules={[
              {
                required: true,
                message: '必須項目です'
              }
            ]}
          >
            {isEditMode ? (
              <StyledSelect onChange={(value) => handleLabelColorChange(value)}>
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
            ) : (
              getLabelColorStr(ticket?.labelColorType || '')
            )}
          </FormItem>
        </Flex>
      </Flex>
    </>
  );
};

const StyledDetailBox = styled.div`
  border: 1px solid ${Colors.TEXT};
  min-height: 400px;
  ${mixinPadding8px}
`;
const StyledLabel = styled.div`
  ${mixinNormalFontSize24px}
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;
