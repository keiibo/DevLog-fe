import React, { useState } from 'react';
import { Status, TStatus } from '../types/TTicket';
import { Flex } from 'antd';
import { Button } from '../../../components/element/button/Button';
import { CategoryLabel } from '../components/elements/CategoryLabel';
import { Ticket } from '../components/compositions/Ticket';
import { styled } from 'styled-components';
import { CreateModal } from '../components/compositions/CreateModal';
import { getTickets } from '../api/ticket';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export const List = (): React.JSX.Element => {
  const { id: projectId } = useParams();
  if (!projectId) {
    return <>ff</>;
  }

  const { data: tickets } = useQuery('tickets', () => getTickets(projectId));
  const [isOpenedNewCreateModal, setIsOpenedNewCreateModal] =
    useState<boolean>(false);

  // 未着手カテゴリの開閉状態
  const [showNotStarted, setShowNotStarted] = useState(true);
  // 着手中
  const [showUnderConstruction, setShowUnderConstruction] = useState(true);
  // 完了
  const [showCompleted, setShowCompleted] = useState(true);

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
              defaultOpenState={
                (tickets &&
                  tickets.filter(
                    (ticket) => ticket.status === Status.NOT_STARTED
                  ).length > 0) ||
                false
              }
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showNotStarted}
              $height={
                (tickets &&
                  tickets.filter(
                    (ticket) => ticket.status === Status.NOT_STARTED
                  ).length) ||
                0
              }
            >
              {tickets &&
                tickets
                  .filter((ticket) => ticket.status === Status.NOT_STARTED)
                  .map((ticket) => (
                    <Ticket ticket={ticket} key={ticket.ticketId} />
                  ))}
            </StyledTicketList>
          </Flex>
          {/* 着手中*/}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'着手中'}
              onClick={() => toggleCategory(Status.UNDER_CONSTRUCTION)}
              defaultOpenState={
                (tickets &&
                  tickets.filter(
                    (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
                  ).length > 0) ||
                false
              }
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showUnderConstruction}
              $height={
                (tickets &&
                  tickets.filter(
                    (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
                  ).length) ||
                0
              }
            >
              {tickets &&
                tickets
                  .filter(
                    (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
                  )
                  .map((ticket) => (
                    <Ticket ticket={ticket} key={ticket.ticketId} />
                  ))}
            </StyledTicketList>
          </Flex>
          {/* 完了 */}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'完了'}
              onClick={() => toggleCategory(Status.COMPLETED)}
              defaultOpenState={
                (tickets &&
                  tickets.filter((ticket) => ticket.status === Status.COMPLETED)
                    .length > 0) ||
                false
              }
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showCompleted}
              $height={
                (tickets &&
                  tickets.filter((ticket) => ticket.status === Status.COMPLETED)
                    .length) ||
                0
              }
            >
              {tickets &&
                tickets
                  .filter((ticket) => ticket.status === Status.COMPLETED)
                  .map((ticket) => (
                    <Ticket ticket={ticket} key={ticket.ticketId} />
                  ))}
            </StyledTicketList>
          </Flex>
        </Flex>
      </Flex>
      <CreateModal
        isOpenedNewCreateModal={isOpenedNewCreateModal}
        setIsOpenedNewCreateModal={setIsOpenedNewCreateModal}
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
