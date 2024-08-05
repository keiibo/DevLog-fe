import { Flex } from 'antd';
import React from 'react';
import { List } from './List';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTickets } from '../api/ticket';
import { TicketDashBoard } from './TicketDashBoard';
import { Loading } from '../../../components/element/loading/Loading';

export const TicketRoot = (): React.JSX.Element => {
  const { id: projectId } = useParams();
  if (!projectId) {
    return <Loading />;
  }
  const { data: ticketList } = useQuery('tickets', () => getTickets(projectId));
  if (!ticketList) {
    return <Loading />;
  }

  return (
    <Flex gap={16}>
      <List ticketList={ticketList} />
      <TicketDashBoard />
    </Flex>
  );
};
