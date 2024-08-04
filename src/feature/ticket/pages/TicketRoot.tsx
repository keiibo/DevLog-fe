import { Flex } from 'antd';
import React from 'react';
import { List } from './List';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTickets } from '../api/ticket';

export const TicketRoot = (): React.JSX.Element => {
  const { id: projectId } = useParams();
  if (!projectId) {
    return <>ff</>;
  }
  const { data: ticketList } = useQuery('tickets', () => getTickets(projectId));
  if (!ticketList) {
    return <>ff</>;
  }

  return (
    <Flex gap={16}>
      <List ticketList={ticketList} />
      <div
        style={{
          backgroundColor: 'red'
        }}
      >
        fdafddsa
      </div>
    </Flex>
  );
};
