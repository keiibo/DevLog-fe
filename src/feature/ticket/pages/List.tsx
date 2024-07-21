import React, { useState } from 'react';
import { Priority, Status, TStatus, TTicket } from '../types/TTicket';
import { Flex } from 'antd';
import { Button } from '../../../components/element/button/Button';
import { CategoryLabel } from '../components/elements/CategoryLabel';
import { Ticket } from '../components/compositions/Ticket';
import { styled } from 'styled-components';
import { CreateModal } from '../components/compositions/CreateModal';

export const List = (): React.JSX.Element => {
  const dummyData: TTicket[] = [
    {
      id: 1,
      labelColorType: 'red',
      title: '完了1つ目のチケット',
      isDeletable: false,
      priority: Priority.HIGH,
      limitStartYm: '2024-01-01',
      status: Status.COMPLETED
    },
    {
      id: 2,
      labelColorType: 'blue',
      title: '未着手2つ目のチケット',
      isDeletable: true,
      priority: Priority.MEDIUM,
      limitEndYm: '2024-01-01',
      status: Status.NOT_STARTED
    },
    {
      id: 3,
      labelColorType: 'white',
      title: '着手中3つ目のチケット',
      isDeletable: true,
      priority: Priority.LOW,
      limitStartYm: '2024-01-01',
      limitEndYm: '2024-01-06',
      status: Status.UNDER_CONSTRUCTION
    },
    {
      id: 4,
      labelColorType: 'white',
      title: '着手中4つ目のチケット',
      isDeletable: true,
      priority: Priority.LOW,
      limitStartYm: '2024-01-01',
      limitEndYm: '2024-01-06',
      status: Status.UNDER_CONSTRUCTION
    },
    {
      id: 5,
      labelColorType: 'white',
      title: '着手中4つ目のチケット',
      isDeletable: true,
      priority: Priority.LOW,
      limitStartYm: '2024-01-01',
      limitEndYm: '2024-01-06',
      status: Status.UNDER_CONSTRUCTION
    },
    {
      id: 6,
      labelColorType: 'white',
      title: '着手中4つ目のチケット',
      isDeletable: true,
      priority: Priority.LOW,
      limitStartYm: '2024-01-01',
      limitEndYm: '2024-01-06',
      status: Status.UNDER_CONSTRUCTION
    },
    {
      id: 7,
      labelColorType: 'white',
      title: '着手中4つ目のチケット',
      isDeletable: true,
      priority: Priority.LOW,
      limitStartYm: '2024-01-01',
      limitEndYm: '2024-01-06',
      status: Status.UNDER_CONSTRUCTION
    },
    {
      id: 8,
      labelColorType: 'white',
      title: '着手中4つ目のチケット',
      isDeletable: true,
      priority: Priority.LOW,
      limitStartYm: '2024-01-01',
      limitEndYm: '2024-01-06',
      status: Status.UNDER_CONSTRUCTION
    }
  ];

  const [isOpenedNewCreateModal, setIsOpenedNewCreateModal] =
    useState<boolean>(false);

  // 未着手カテゴリの開閉状態
  const [showNotStarted, setShowNotStarted] = useState(true);
  // 着手中
  const [showUnderConstruction, setShowUnderConstruction] = useState(true);
  // 完了
  const [showCompleted, setShowCompleted] = useState(true);

  // モーダルキャンセル時
  const handleCancel = (): void => {
    setIsOpenedNewCreateModal(false);
  };
  // 新規作成ボタン押下時にモーダルを開く
  const handleNewCreateClick = (): void => {
    setIsOpenedNewCreateModal(true);
  };

  // 各ステータスの開閉状態をトグルする
  const toggleCategory = (status: TStatus): void => {
    switch (status) {
      case Status.NOT_STARTED:
        setShowNotStarted(!showNotStarted);
        break;
      case Status.UNDER_CONSTRUCTION:
        setShowUnderConstruction(!showUnderConstruction);
        break;
      case Status.COMPLETED:
        setShowCompleted(!showCompleted);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Flex vertical gap={16}>
        <Flex justify="space-between">
          <div>aaa</div>
          <Button type="primary" onClick={handleNewCreateClick}>
            新規作成
          </Button>
        </Flex>

        <Flex vertical gap={24}>
          {/* 未着手 */}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'未着手'}
              onClick={() => toggleCategory(Status.NOT_STARTED)}
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showNotStarted}
              $height={
                dummyData.filter(
                  (ticket) => ticket.status === Status.NOT_STARTED
                ).length
              }
            >
              {dummyData
                .filter((ticket) => ticket.status === Status.NOT_STARTED)
                .map((ticket) => (
                  <Ticket ticket={ticket} key={ticket.id} />
                ))}
            </StyledTicketList>
          </Flex>
          {/* 着手中*/}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'着手中'}
              onClick={() => toggleCategory(Status.UNDER_CONSTRUCTION)}
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showUnderConstruction}
              $height={
                dummyData.filter(
                  (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
                ).length
              }
            >
              {dummyData
                .filter((ticket) => ticket.status === Status.UNDER_CONSTRUCTION)
                .map((ticket) => (
                  <Ticket ticket={ticket} key={ticket.id} />
                ))}
            </StyledTicketList>
          </Flex>
          {/* 完了 */}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'完了'}
              onClick={() => toggleCategory(Status.COMPLETED)}
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showCompleted}
              $height={
                dummyData.filter((ticket) => ticket.status === Status.COMPLETED)
                  .length
              }
            >
              {dummyData
                .filter((ticket) => ticket.status === Status.COMPLETED)
                .map((ticket) => (
                  <Ticket ticket={ticket} key={ticket.id} />
                ))}
            </StyledTicketList>
          </Flex>
        </Flex>
      </Flex>
      <CreateModal
        isOpenedNewCreateModal={isOpenedNewCreateModal}
        handleCancel={handleCancel}
      />
    </>
  );
};

const StyledTicketList = styled(Flex)<{ $show: boolean; $height: number }>`
  padding-left: 32px;
  /* 70は1チケットあたりの高さ */
  max-height: ${(props) => (props.$show ? `${props.$height * 70}px` : '0')};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
`;
