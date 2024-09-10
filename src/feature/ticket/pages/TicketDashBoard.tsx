import { Flex } from 'antd';
import React from 'react';
import { TTicket } from '../types/TTicket';
import { WeeklyBoard } from '../components/compositions/weeklyBoard/WeeklyBoard';

type TProps = {
  ticketList: TTicket[];
};
// #DVLG-41
export const TicketDashBoard = ({ ticketList }: TProps): React.JSX.Element => {
  return (
    <Flex style={{ width: '100%' }}>
      <WeeklyBoard ticketList={ticketList} />
    </Flex>
  );
};
