import React, { useState } from 'react';
import { Status, TStatus, TTicket } from '../types/TTicket';
import { Flex } from 'antd';
import { Button } from '../../../components/element/button/Button';
import { CategoryLabel } from '../components/elements/CategoryLabel';
import { Ticket } from '../components/compositions/Ticket';
import { styled } from 'styled-components';
import { CreateModal } from '../components/compositions/CreateModal';
import { mixinTextColor } from '../../../style/Mixin';
type TProps = {
  ticketList: TTicket[];
};

export const List = ({ ticketList }: TProps): React.JSX.Element => {
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
      <StyledListFlexContainer vertical gap={16}>
        <StyledListDataFlex justify="space-between" align="center">
          <Flex gap={8}>
            未着手{' '}
            {ticketList &&
              ticketList.filter(
                (ticket) => ticket.status === Status.NOT_STARTED
              ).length}
            件 着手中{'  '}
            {ticketList &&
              ticketList.filter(
                (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
              ).length}
            件 完了{'  '}
            {ticketList &&
              ticketList.filter((ticket) => ticket.status === Status.COMPLETED)
                .length}
            件 / 全{ticketList && ticketList.length}件
          </Flex>
          <Button type="primary" onClick={handleNewCreateClick}>
            新規作成
          </Button>
        </StyledListDataFlex>

        <Flex vertical gap={24}>
          {/* 未着手 */}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'未着手'}
              onClick={() => toggleCategory(Status.NOT_STARTED)}
              defaultOpenState={
                (ticketList &&
                  ticketList.filter(
                    (ticket) => ticket.status === Status.NOT_STARTED
                  ).length > 0) ||
                false
              }
            />
            <StyledTicketList
              vertical
              gap={2}
              $show={showNotStarted}
              $height={
                (ticketList &&
                  ticketList.filter(
                    (ticket) => ticket.status === Status.NOT_STARTED
                  ).length) ||
                0
              }
            >
              {ticketList &&
                ticketList
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
                (ticketList &&
                  ticketList.filter(
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
                (ticketList &&
                  ticketList.filter(
                    (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
                  ).length) ||
                0
              }
            >
              {ticketList &&
                ticketList
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
                (ticketList &&
                  ticketList.filter(
                    (ticket) => ticket.status === Status.COMPLETED
                  ).length > 0) ||
                false
              }
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showCompleted}
              $height={
                (ticketList &&
                  ticketList.filter(
                    (ticket) => ticket.status === Status.COMPLETED
                  ).length) ||
                0
              }
            >
              {ticketList &&
                ticketList
                  .filter((ticket) => ticket.status === Status.COMPLETED)
                  .map((ticket) => (
                    <Ticket ticket={ticket} key={ticket.ticketId} />
                  ))}
            </StyledTicketList>
          </Flex>
        </Flex>
      </StyledListFlexContainer>
      <CreateModal
        isOpenedNewCreateModal={isOpenedNewCreateModal}
        setIsOpenedNewCreateModal={setIsOpenedNewCreateModal}
      />
    </>
  );
};

const StyledListFlexContainer = styled(Flex)``;

const StyledListDataFlex = styled(Flex)`
  ${mixinTextColor}
`;

const StyledTicketList = styled(Flex)<{ $show: boolean; $height: number }>`
  padding-left: 32px;
  /* 70は1チケットあたりの高さ */
  max-height: ${(props) => (props.$show ? `${props.$height * 70}px` : '0')};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
`;
