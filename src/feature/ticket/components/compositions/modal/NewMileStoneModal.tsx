import React, { useState } from 'react';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import { styled } from 'styled-components';
import {
  mixinNormalFontSize16px,
  mixinNormalFontSize24px
} from '../../../../../style/Mixin';
import { MultiLineText } from '../../../../../components/composition/MultiLineText';
import { Flex, notification, Table } from 'antd';
import { Form } from '../../../../../components/element/form/Form';
import { FormItem } from '../../../../../components/element/form/FormItem';
import { Input } from '../../../../../components/element/input/Input';
import { Button } from '../../../../../components/element/button/Button';
import { TCreateMileStoneReq, TTicket } from '../../../types/TTicket';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMileStone } from '../../../api/mileStone';
import { QueryKey } from '../../../../../constant/QueryKey';
import { NOTIFICATION_TIME } from '../../../../../constant/Notification';

type TProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  tickets: TTicket[];
};

export const NewMileStoneModal = ({
  isOpened,
  setIsOpened,
  setIsSelectModalOpened,
  title,
  tickets
}: TProps): React.JSX.Element => {
  const { id } = useParams();
  const [form] = useForm();
  const queryClient = useQueryClient();

  // ステップ管理用のstate
  const [step, setStep] = useState(1);
  // チェックされたチケットの情報を保持するstate
  const [selectedTickets, setSelectedTickets] = useState<TTicket[]>([]);

  const handleNext = () => {
    form
      .validateFields() // バリデーションを実行
      .then(() => {
        // バリデーション成功時に次のステップに進む
        setStep((prevStep) => prevStep + 1);
      });
  };

  const handleBack = () => {
    // ステップを戻す
    setStep((prevStep) => prevStep - 1);
  };

  const handleCheckboxChange = (ticket: TTicket, isChecked: boolean) => {
    setSelectedTickets((prevSelected) => {
      if (isChecked) {
        // チェックされた場合、選択リストに追加
        return [...prevSelected, ticket];
      } else {
        // チェックが外された場合、選択リストから削除
        return prevSelected.filter((t) => t.ticketId !== ticket.ticketId);
      }
    });
  };

  const mutation = useMutation({
    mutationFn: createMileStone,
    onSuccess: () => {
      notification.success({
        message: `マイルストーンを作成しました`,
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
      setIsOpened(false);
      setIsSelectModalOpened(false);
      queryClient.invalidateQueries({ queryKey: [QueryKey.TICKET_LIST] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.MILESTONE_LIST] });
    }
  });

  const handleSave = () => {
    const req: TCreateMileStoneReq = {
      projectId: id || '',
      mileStone: {
        uuid: v4(),
        name: form.getFieldValue('title'),
        version: form.getFieldValue('version')
      },
      updateTicketIds: selectedTickets.map((selected) => {
        return selected.ticketId;
      })
    };
    mutation.mutate(req);
  };

  // 選択されたチケットが含まれているかチェックする関数
  const isTicketSelected = (ticketId: string) => {
    return selectedTickets.some((t) => t.ticketId === ticketId);
  };

  const dataSource = tickets.map((ticket) => ({
    key: ticket.ticketId,
    checkbox: (
      <Checkbox
        onChange={(e) => handleCheckboxChange(ticket, e.target.checked)}
        checked={isTicketSelected(ticket.ticketId)}
      />
    ),
    id: ticket.ticketId,
    name: ticket.title
  }));

  const selectedTicketDataSource = selectedTickets.map((selectedTicket) => ({
    key: selectedTicket.ticketId,
    id: selectedTicket.ticketId,
    name: selectedTicket.title
  }));

  // テーブルのカラム構造
  const columns = [
    {
      title: '選択',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: '60px'
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '120px'
    },
    {
      title: 'チケット名',
      dataIndex: 'name',
      key: 'name'
    }
  ];

  const selectedColumn = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '120px'
    },
    {
      title: 'チケット名',
      dataIndex: 'name',
      key: 'name'
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
      }}
    >
      <ModalHeader
        title={title}
        hasCloseIcon
        onClickCloseButton={() => {
          setIsOpened(false);
        }}
        hasBack={step === 2 || step === 3}
        onClickBack={handleBack}
      />
      <ModalBody>
        <Flex vertical gap={16}>
          {step === 1 && (
            <>
              <StyledSubTitle>
                プロジェクトの進行を可視化するために
              </StyledSubTitle>
              <MultiLineText
                text="「マイルストーン」は、プロジェクトの大きな目標や重要なステージを示します。
設定されたマイルストーンは、プロジェクトの進捗状況を評価する上での指標となります。
適切なマイルストーンを設定することで、全体の進捗を効率的に管理できます。"
              />
              <Form form={form}>
                <Flex vertical gap={16}>
                  <Flex vertical gap={4}>
                    <StyledLabel>タイトル:</StyledLabel>
                    <FormItem
                      noStyle
                      name={'title'}
                      rules={[
                        {
                          required: true,
                          message: '入力してください'
                        }
                      ]}
                    >
                      <Input
                        width={'100%'}
                        placeholder="マイルストーン名を入力"
                      />
                    </FormItem>
                  </Flex>
                  <Flex vertical gap={4}>
                    <StyledLabel>バージョン:</StyledLabel>
                    <FormItem
                      noStyle
                      name={'version'}
                      rules={[
                        {
                          required: true,
                          message: '入力してください'
                        }
                      ]}
                    >
                      <Input width={'100'} placeholder="v1.0.0" />
                    </FormItem>
                  </Flex>
                  <Flex justify="center">
                    <FormItem>
                      <Button type="primary" onClick={handleNext}>
                        次へ
                      </Button>
                    </FormItem>
                  </Flex>
                </Flex>
              </Form>
            </>
          )}
          {step === 2 && (
            <>
              <StyledSubTitle>既存のチケットを追加する</StyledSubTitle>
              <MultiLineText
                text="既に起票していたチケットをマイルストーンに含めることができます。
ここで設定をせず、マイルストーンだけを登録することも可能です。
チケット詳細画面でもマイルストーンの設定は可能です。"
              />
              <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{ y: 300 }} // テーブルの縦スクロールを有効にし、300pxを超えたらスクロール
                pagination={false}
              />
              <Flex justify="center">
                <Button type="primary" onClick={handleNext}>
                  次へ
                </Button>
              </Flex>
            </>
          )}
          {step === 3 && (
            <>
              <StyledSubTitle>
                以下の内容でマイルストーンを作成します
              </StyledSubTitle>
              <Flex vertical gap={4}>
                <StyledLabel>
                  タイトル: {form.getFieldValue('title')}
                </StyledLabel>
                <StyledLabel>
                  バージョン: {form.getFieldValue('version')}
                </StyledLabel>
                <Flex vertical>
                  <StyledLabel>初期追加するチケット:</StyledLabel>
                  <Table
                    dataSource={selectedTicketDataSource}
                    columns={selectedColumn}
                    scroll={{ y: 300 }}
                    pagination={false}
                  />
                </Flex>
              </Flex>
              <Flex justify="center">
                <Button type="primary" onClick={handleSave}>
                  作成
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </ModalBody>
    </Modal>
  );
};
const StyledSubTitle = styled.h3`
  ${mixinNormalFontSize24px}
  font-weight: 100;
  margin: 0;
`;
const StyledLabel = styled.div`
  ${mixinNormalFontSize16px}
`;
