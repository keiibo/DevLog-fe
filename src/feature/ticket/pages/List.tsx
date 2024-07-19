import React from 'react';
import { Priority, Status, TTicket } from '../types/TTicket';
import { Flex } from 'antd';
import { Button } from '../../../components/element/button/Button';
import { CategoryLabel } from '../components/elements/CategoryLabel';
import { Ticket } from '../components/compositions/Ticket';
import { styled } from 'styled-components';

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
      id: 5,
      labelColorType: 'white',
      title: '着手中4つ目のチケット',
      isDeletable: true,
      priority: Priority.LOW,
      limitStartYm: '2024-01-01',
      limitEndYm: '2024-01-06',
      status: Status.UNDER_CONSTRUCTION
    }
  ];
  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between">
        <div>aaa</div>
        <Button type="primary">新規作成</Button>
      </Flex>

      <Flex vertical gap={24}>
        {/* 未着手 */}
        <Flex vertical gap={8}>
          <CategoryLabel label={'未着手'} />
          <StyledTicketList vertical gap={4}>
            {dummyData
              .filter((ticket) => ticket.status === Status.NOT_STARTED)
              .map((ticket) => (
                <Ticket ticket={ticket} />
              ))}
          </StyledTicketList>
        </Flex>
        {/* 着手中*/}
        <Flex vertical gap={8}>
          <CategoryLabel label={'着手中'} />
          <StyledTicketList vertical gap={4}>
            {dummyData
              .filter((ticket) => ticket.status === Status.UNDER_CONSTRUCTION)
              .map((ticket) => (
                <Ticket ticket={ticket} />
              ))}
          </StyledTicketList>
        </Flex>
        {/* 完了 */}
        <Flex vertical gap={8}>
          <CategoryLabel label={'完了'} />
          <StyledTicketList vertical gap={4}>
            {dummyData
              .filter((ticket) => ticket.status === Status.COMPLETED)
              .map((ticket) => (
                <Ticket ticket={ticket} />
              ))}
          </StyledTicketList>
        </Flex>
      </Flex>
    </Flex>
  );
};

const StyledTicketList = styled(Flex)`
  padding-left: 32px;
`;
