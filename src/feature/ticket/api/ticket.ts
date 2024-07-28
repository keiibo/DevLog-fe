import axios from 'axios';
import { TCreateTicketReq, TGetTicketRes } from '../types/TTicket';

/**
 * チケット一覧の取得
 */
export const getTickets = async (
  projectId: string
): Promise<TGetTicketRes[]> => {
  const response = await axios.get(
    `http://localhost:4001/api/tickets?projectId=${projectId}`
  );
  return response.data;
};

/**
 * チケットの新規作成
 */
export const createTicket = async (
  req: TCreateTicketReq
): Promise<TGetTicketRes> => {
  const response = await axios.post(`http://localhost:4001/api/tickets`, req);
  return response.data;
};
