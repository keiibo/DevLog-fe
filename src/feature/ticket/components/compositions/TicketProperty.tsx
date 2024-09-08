import React, { SetStateAction, useMemo, useState } from 'react';
import {
  LabelColorType,
  Priority,
  Status,
  TCategory,
  TLabelColorType,
  TTicket
} from '../../types/TTicket';
import { FormItem } from '../../../../components/element/form/FormItem';
import { Checkbox, Flex } from 'antd';
import dayjs from 'dayjs';
import DatePicker from '../../../../components/element/datepicker/DatePicker';
import { DateFormat } from '../../../../constant/DateFormat';
import { styled } from 'styled-components';
import {
  mixinDangerColor,
  mixinNormalFontSize16px,
  mixinPadding8px
} from '../../../../style/Mixin';
import { Select } from '../../../../components/element/select/Select';
import { Option } from '../../../../components/element/select/Option';
import { getPriorityStr } from '../../lib/priority';
import { Colors } from '../../../../style/Colors';
import { getLabelColorStr } from '../../lib/labelColor';
import { getStatusStr } from '../../lib/status';
import { isOverLimitDate } from '../../lib/limitDate';
import { useQuery } from 'react-query';
import { getCategories } from '../../api/category';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../components/element/loading/Loading';
import { Category } from '../elements/Category';
import { Divider } from '../../../../components/element/divider/Divider';
import SimpleMdeReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import ReactMarkdown from 'react-markdown';

type TProps = {
  isEditMode: boolean;
  ticket: TTicket | null;
  setLabelColor?: React.Dispatch<SetStateAction<TLabelColorType | undefined>>;
  selectedCategories: TCategory[];
  setSelectedCategories: React.Dispatch<SetStateAction<TCategory[]>>;
};

export const TicketProperty = ({
  isEditMode,
  ticket,
  setLabelColor,
  selectedCategories,
  setSelectedCategories
}: TProps): React.JSX.Element => {
  const [startYm, setStartYm] = useState(
    ticket ? dayjs(ticket.limitStartYm) : undefined
  );
  const [markdownValue, setMarkdownValue] = useState('');

  const { id } = useParams();
  const { data } = useQuery('category', () => getCategories(id || ''));

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

  /**
   * カテゴリをトグルする関数
   */
  const toggleCheckbox = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      const index = prevSelected.findIndex(
        (category) => category.uuid === categoryId
      );
      if (index >= 0) {
        // カテゴリが既に選択されている場合、リストから削除する
        return prevSelected.filter((category) => category.uuid !== categoryId);
      } else {
        // カテゴリが選択されていない場合、新たにリストに追加する
        const newCategory = {
          uuid: categoryId,
          name: data?.find((d) => d.uuid === categoryId)?.name || ''
        };
        return [...prevSelected, newCategory];
      }
    });
  };

  const options = useMemo(() => {
    return {
      toolbar: [
        'bold', // 太字
        'italic', // 斜体
        'heading', // 見出し
        '|', // 区切り線
        'quote', // 引用
        'unordered-list', // リスト
        'ordered-list', // 番号付きリスト
        '|',
        'link', // リンク
        '|',
        'preview' // プレビュー
      ],
      spellChecker: false,
      lineNumbers: false,
      indentWithTabs: false
    } as SimpleMDE.Options;
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      {isEditMode ? (
        <>
          <StyledLabel>詳細:</StyledLabel>
          <FormItem name={'detail'} noStyle initialValue={ticket?.detail}>
            <SimpleMdeReact
              value={markdownValue}
              onChange={(e) => setMarkdownValue(e)}
              options={options}
            />
          </FormItem>
        </>
      ) : (
        // 表示
        <StyledDetailBox>
          <ReactMarkdown>{ticket?.detail}</ReactMarkdown>
        </StyledDetailBox>
      )}
      <Divider />
      <Flex gap={48}>
        <StyledPropertyFlex vertical gap={8} flex={4}>
          <Flex align="center" justify="space-between">
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
                <StyledSelect
                  onChange={(value) => handleLabelColorChange(value)}
                >
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
        </StyledPropertyFlex>
        <StyledPropertyFlex vertical gap={8} flex={6}>
          <Flex align="center" justify="space-between">
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
                  <StyledSpan $isToday={isOverLimitDate(ticket.limitEndYm)}>
                    {dayjs(ticket.limitStartYm).format(DateFormat.SLASH)}
                  </StyledSpan>
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
                  <DatePicker
                    format={DateFormat.SLASH}
                    minDate={startYm ? startYm.add(-1, 'day') : undefined}
                  />
                ) : ticket?.limitEndYm ? (
                  <StyledSpan $isToday={isOverLimitDate(ticket.limitEndYm)}>
                    {dayjs(ticket.limitEndYm).format(DateFormat.SLASH)}
                  </StyledSpan>
                ) : (
                  ''
                )}
              </FormItem>
            </Flex>
          </Flex>
        </StyledPropertyFlex>
      </Flex>
      <Divider />
      <StyledLabel>カテゴリ:</StyledLabel>
      <StyledCategoryFlex gap={8}>
        {isEditMode ? (
          <FormItem
            noStyle
            name="categories"
            initialValue={selectedCategories.map((category) => category.uuid)}
          >
            <Checkbox.Group
              value={selectedCategories.map((category) => category.uuid)}
              onChange={(checkedValues) => {
                data.forEach((category) => {
                  if (checkedValues.includes(category.uuid)) {
                    if (
                      !selectedCategories.some((c) => c.uuid === category.uuid)
                    ) {
                      toggleCheckbox(category.uuid);
                    }
                  } else {
                    if (
                      selectedCategories.some((c) => c.uuid === category.uuid)
                    ) {
                      toggleCheckbox(category.uuid);
                    }
                  }
                });
              }}
            >
              {data.map((category) => (
                <Checkbox key={category.uuid} value={category.uuid}>
                  {category.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </FormItem>
        ) : (
          <>
            {ticket?.categories?.map((category) => {
              if (data.find((d) => d.uuid === category.uuid)) {
                return <Category key={category.uuid} category={category} />;
              }
            })}
          </>
        )}
      </StyledCategoryFlex>
    </>
  );
};

const StyledPropertyFlex = styled(Flex)`
  width: 50%;
`;

const StyledDetailBox = styled.div`
  border: 1px solid ${Colors.TEXT};
  min-height: 320px;
  ${mixinPadding8px}
`;
const StyledLabel = styled.div`
  ${mixinNormalFontSize16px}
`;

const StyledSelect = styled(Select)`
  width: 120px;
`;

const StyledSpan = styled.span<{ $isToday: boolean }>`
  ${({ $isToday }) => ($isToday ? mixinDangerColor : '')}
`;

const StyledCategoryFlex = styled(Flex)`
  padding-left: 16px;
`;
