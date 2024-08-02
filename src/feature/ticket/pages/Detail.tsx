import React, { useEffect, useState } from 'react';
import { Status, TLabelColorType, TPutTicketReq } from '../types/TTicket';
import { TicketTitle } from '../components/compositions/TicketTitle';
import styled from 'styled-components';
import { getLabelColor } from '../lib/labelColor';
import {
  mixinBgWhite,
  mixinBorderRadius12px,
  mixinPadding12px
} from '../../../style/Mixin';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTicket, updateTicket } from '../api/ticket';
import { Flex, notification, Space } from 'antd';
import { Button } from '../../../components/element/button/Button';
import { TicketProperty } from '../components/compositions/TicketProperty';
import { Form } from '../../../components/element/form/Form';
import { useForm } from 'antd/es/form/Form';

export const Detail = (): React.JSX.Element => {
  const { id: projectId, ticketId } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [labelColor, setLabelColor] = useState<TLabelColorType>();
  const [form] = useForm();
  const queryClient = useQueryClient();
  const { data: ticket, isLoading } = useQuery('ticketDetail', () =>
    getTicket(ticketId || '')
  );

  /**
   * putMutation
   */
  const mutation = useMutation(updateTicket, {
    onSuccess: () => {
      notification.success({
        message: 'チケットを更新しました',
        duration: 3 // 通知が表示される時間（秒）
      });
      queryClient.invalidateQueries('ticketDetail');
      setIsEditMode(false);
    },
    onError: () => {
      // エラー処理
      notification.error({
        message: 'チケット更新失敗',
        description: 'チケットの更新に失敗しました。再試行してください。',
        duration: 3
      });
    }
  });

  useEffect(() => {
    setLabelColor(ticket?.labelColorType);
  }, [ticket]);

  if (!ticketId || !projectId || isLoading || !ticket)
    return <div>Loading</div>;

  const { ticketId: id, title, isDeletable, labelColorType } = ticket;

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
        ? form.getFieldValue('limitStartYm').format('YYYY-MM-DD')
        : null,
      limitEndYm: form.getFieldValue('limitEndYm')
        ? form.getFieldValue('limitEndYm').format('YYYY-MM-DD')
        : null,
      detail: form.getFieldValue('detail'),
      priority: form.getFieldValue('priority'),
      status: form.getFieldValue('status')
    };
    console.log(req);
    mutation.mutate({ req, ticketId });
  };

  return (
    <StyledDetailContainer>
      <Form onFinish={handleEditFinish} form={form}>
        <StyledTicketContainer vertical gap={16} $labelColor={labelColor || ''}>
          <TicketTitle
            id={id}
            title={title}
            isDeletable={isDeletable}
            mode={'detail'}
            labelColorType={labelColorType}
            isEditable
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
          <TicketProperty
            isEditMode={isEditMode}
            ticket={ticket}
            setLabelColor={setLabelColor}
          ></TicketProperty>
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
      </Form>
    </StyledDetailContainer>
  );
};

const StyledDetailContainer = styled.div``;

const StyledTicketContainer = styled(Flex)<{
  $labelColor: TLabelColorType;
}>`
  border-top: 12px solid ${(props) => getLabelColor(props.$labelColor)};

  ${mixinPadding12px}
  ${mixinBgWhite}
  ${mixinBorderRadius12px};
`;
