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
    <Flex>
      <WeeklyBoard ticketList={ticketList} />
    </Flex>
  );
};
