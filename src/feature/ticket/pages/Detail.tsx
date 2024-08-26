import React, { useEffect, useState } from 'react';
import {
  Status,
  TCategory,
  TLabelColorType,
  TPutTicketReq
} from '../types/TTicket';
import { TicketTitle } from '../components/compositions/TicketTitle';
import styled from 'styled-components';
import { getLabelColor } from '../lib/labelColor';
import {
  mixinBgWhite,
  mixinBorderRadius12px,
  mixinNormalFontSize16px,
  mixinPadding12px,
  mixinTextColor
} from '../../../style/Mixin';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTicket, getTicket, updateTicket } from '../api/ticket';
import { Flex, notification, Space } from 'antd';
import { Button } from '../../../components/element/button/Button';
import { TicketProperty } from '../components/compositions/TicketProperty';
import { Form } from '../../../components/element/form/Form';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { DateFormat } from '../../../constant/DateFormat';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Loading } from '../../../components/element/loading/Loading';
import { NOTIFICATION_TIME } from '../../../constant/Notification';

export const Detail = (): React.JSX.Element => {
  const { id: projectId, ticketId } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [labelColor, setLabelColor] = useState<TLabelColorType>();
  const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([]);

  const [form] = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: ticket, isLoading } = useQuery('ticketDetail', () =>
    getTicket(ticketId || '')
  );

  /**
   * putMutation
   */
  const putMutation = useMutation(updateTicket, {
    onSuccess: () => {
      notification.success({
        message: 'チケットを更新しました',
        duration: NOTIFICATION_TIME.SUCCESS
      });
      queryClient.invalidateQueries('ticketDetail');
      setIsEditMode(false);
    },
    onError: () => {
      // エラー処理
      notification.error({
        message: 'チケット更新失敗',
        description: 'チケットの更新に失敗しました。再試行してください。',
        duration: NOTIFICATION_TIME.ERROR
      });
    }
  });

  /**
   * deleteMutation
   */
  const deleteMutation = useMutation(deleteTicket, {
    onSuccess: () => {
      notification.success({
        message: 'チケットを削除しました',
        duration: NOTIFICATION_TIME.SUCCESS
      });
      queryClient.invalidateQueries('ticketDetail');
      navigate(`/${projectId}/ticket`);
    },
    onError: () => {
      // エラー処理
      notification.error({
        message: 'チケット削除失敗',
        description: 'チケットの削除に失敗しました。再試行してください。',
        duration: NOTIFICATION_TIME.ERROR
      });
    }
  });

  useEffect(() => {
    setLabelColor(ticket?.labelColorType);
    form.setFieldsValue({
      title: ticket?.title,
      priority: ticket?.priority,
      status: ticket?.status,
      labelColorType: ticket?.labelColorType,
      detail: ticket?.detail,
      limitStartYm: ticket?.limitStartYm ? dayjs(ticket?.limitStartYm) : null,
      limitEndYm: ticket?.limitEndYm ? dayjs(ticket?.limitEndYm) : null,
      isDeletable: ticket?.isDeletable
    });
    setSelectedCategories(ticket?.categories || []);
  }, [ticket]);

  if (!ticketId || !projectId || isLoading || !ticket) return <Loading />;

  /**
   * 更新ボタン押下時、putリクエストを投げる
   */
  const handleEditFinish = () => {
    const req: TPutTicketReq = {
      title: form.getFieldValue('title'),
      isDeletable: form.getFieldValue('status') === Status.COMPLETED,
      labelColorType: form.getFieldValue('labelColorType'),
      projectId,
      limitStartYm: form.getFieldValue('limitStartYm')
        ? form.getFieldValue('limitStartYm').format(DateFormat.HYPHEN)
        : null,
      limitEndYm: form.getFieldValue('limitEndYm')
        ? form.getFieldValue('limitEndYm').format(DateFormat.HYPHEN)
        : null,
      detail: form.getFieldValue('detail'),
      priority: form.getFieldValue('priority'),
      status: form.getFieldValue('status'),
      categories: selectedCategories
    };
    putMutation.mutate({ req, ticketId });
  };

  /**
   * 削除モーダルでの削除処理
   */
  const handleDelete = () => {
    deleteMutation.mutate(ticketId);
  };

  /**
   * 戻るボタン押下で一覧に戻る
   */
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Flex vertical gap={16}>
      <StyledBackFlex gap={8} onClick={handleBack}>
        <ArrowLeftOutlined />
        戻る
      </StyledBackFlex>
      <Form onFinish={handleEditFinish} form={form}>
        <Flex>
          <StyledTicketContainer
            vertical
            gap={16}
            $labelColor={labelColor || ''}
          >
            <TicketTitle
              id={ticket.ticketId}
              title={ticket.title}
              isDeletable
              mode={'detail'}
              labelColorType={ticket.labelColorType}
              isEditable
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
            <TicketProperty
              isEditMode={isEditMode}
              ticket={ticket}
              setLabelColor={setLabelColor}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <Flex justify="center">
              <Space>
                {isEditMode && (
                  <Button htmlType={'submit'} type="primary">
                    更新
                  </Button>
                )}
              </Space>
            </Flex>
          </StyledTicketContainer>
        </Flex>
      </Form>
    </Flex>
  );
};

const StyledBackFlex = styled(Flex)`
  width: fit-content;
  cursor: pointer;
  ${mixinTextColor}
  ${mixinNormalFontSize16px}
`;

const StyledTicketContainer = styled(Flex)<{
  $labelColor: TLabelColorType;
}>`
  width: 800px;
  border-top: 12px solid ${(props) => getLabelColor(props.$labelColor)};

  ${mixinPadding12px}
  ${mixinBgWhite}
  ${mixinBorderRadius12px};
`;
