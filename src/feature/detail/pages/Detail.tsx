import { Flex, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../components/compositions/Section';
import { CategoryLabelMode } from '../../../components/composition/categoryLabel/CategoryLabel';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProject } from '../../../api/project';
import { Loading } from '../../../components/element/loading/Loading';
import { LinkIcon } from '../components/elements/LinkIcon';
import { IconType } from '../../../components/element/icon/Icon';
import { styled } from 'styled-components';
import dayjs from 'dayjs';
import { DateFormat } from '../../../constant/DateFormat';
import { Input } from '../../../components/element/input/Input';
import { Textarea } from '../../../components/element/textarea/Textarea';
import { Form } from '../../../components/element/form/Form';
import { FormItem } from '../../../components/element/form/FormItem';
import { MultiLineText } from '../../../components/composition/MultiLineText';
import { updateProject } from '../api/detail';
import { TGetProjectRes, TUpdateProjectReq } from '../types/TProject';
import { useForm } from 'antd/es/form/Form';
import { NOTIFICATION_TIME } from '../../../constant/Notification';
import { QueryKey } from '../../../constant/QueryKey';

export const Detail = (): React.JSX.Element => {
  const { id: projectId } = useParams();
  const ref = useRef<HTMLElement>(null);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDetailEdit, setIsDetailEdit] = useState(false);
  const [form] = useForm();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [QueryKey.PROJECT_DETAIL],
    queryFn: () => getProject(projectId || '')
  });
  const [detail, setDetail] = useState<TGetProjectRes>();

  if (!data || !projectId) <Loading />;

  useEffect(() => {
    setDetail(data);
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECT_DETAIL] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECT_LIST] });
      notification.success({
        message: `プロジェクト情報を更新しました`,
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
    },
    onError: () => {}
  });

  const handleUpdate = () => {
    const body: TUpdateProjectReq = {
      name: form.getFieldValue('title'),
      detail: form.getFieldValue('detail')
    };

    const request = {
      projectId: projectId || '',
      req: body
    };

    updateMutation.mutate(request);
  };

  const items = [
    {
      label: 'プロジェクト名',
      mode: CategoryLabelMode.BUTTON,
      children: isTitleEdit ? (
        <FormItem initialValue={detail?.name} name={'title'}>
          <StyledInput />
        </FormItem>
      ) : (
        detail?.name
      ),
      buttonTitle: isTitleEdit ? '保存' : '編集',
      onButtonClick: () => {
        if (!isTitleEdit) {
          setIsTitleEdit(true);
          return;
        }
        // 更新処理
        handleUpdate();
        setIsTitleEdit(false);
      },
      isButtonDisabled: isDetailEdit
    },
    {
      label: '詳細',
      mode: CategoryLabelMode.BUTTON,
      children: isDetailEdit ? (
        <FormItem initialValue={detail?.detail} name="detail">
          <Textarea rows={12} />
        </FormItem>
      ) : (
        <MultiLineText text={detail?.detail || ''} />
      ),
      buttonTitle: isDetailEdit ? '保存' : '編集',
      onButtonClick: () => {
        if (!isDetailEdit) {
          setIsDetailEdit(true);
          return;
        }
        // 更新処理
        handleUpdate();
        setIsDetailEdit(false);
      },
      isButtonDisabled: isTitleEdit
    },
    {
      label: '期限日',
      mode: CategoryLabelMode.NONE,
      children: dayjs(detail?.limitDate).format(DateFormat.SLASH)
    },
    {
      label: '各種リンク',
      subText: '保存済みのアイコンは長押しで編集できます',
      mode: CategoryLabelMode.NONE,
      children: (
        <StyledIconFlex gap={8}>
          {detail?.linkIconList.map((data, index) => (
            <StyledLinkIcon key={index}>
              <LinkIcon
                linkIconList={detail.linkIconList}
                type={data.iconType}
                link={data.url}
                name={data.name}
                uuid={data.uuid}
                isInTooltip={false}
              />
            </StyledLinkIcon>
          ))}
          <StyledLinkIcon>
            {/* 追加アイコン */}
            <LinkIcon
              linkIconList={detail?.linkIconList || []}
              type={IconType.PLUS}
              isInTooltip={false}
              uuid={''}
            />
          </StyledLinkIcon>
        </StyledIconFlex>
      )
    }
  ];

  return (
    <Flex vertical gap={8} ref={ref}>
      <Form form={form}>
        {items.map((item) => (
          <Section
            key={item.label}
            label={item.label}
            subText={item.subText}
            mode={item.mode}
            children={item.children}
            onButtonClick={item.onButtonClick}
            buttonTitle={item.buttonTitle}
            isButtonDisabled={item.isButtonDisabled}
          />
        ))}
      </Form>
    </Flex>
  );
};

const StyledLinkIcon = styled.div`
  flex: 0 0 2; // 8個表示で折り返す計算（100% / 8 - gap）
`;

const StyledIconFlex = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; // ここを調整してアイテムの配置を制御
`;

const StyledInput = styled(Input)`
  width: 100%;
`;
