import { Flex } from 'antd';
import React from 'react';
import { List } from './List';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTickets } from '../api/ticket';
import { TicketDashBoard } from './TicketDashBoard';
import { Loading } from '../../../components/element/loading/Loading';
import { QueryKey } from '../../../constant/QueryKey';
import { getMileStones } from '../api/mileStone';

export const TicketRoot = (): React.JSX.Element => {
  const { id: projectId } = useParams();
  if (!projectId) {
    return <Loading />;
  }
  const { data: ticketList } = useQuery(QueryKey.TICKET_LIST, () =>
    getTickets(projectId)
  );
  const { data: mileStoneList } = useQuery(QueryKey.MILESTONE_LIST, () =>
    getMileStones(projectId || '')
  );
  if (!ticketList || !mileStoneList) {
    return <Loading />;
  }

  return (
    <Flex gap={16}>
      <List ticketList={ticketList} mileStoneList={mileStoneList} />
      <TicketDashBoard ticketList={ticketList} />
    </Flex>
  );
};
