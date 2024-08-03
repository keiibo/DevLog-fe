import axios from 'axios';
import {
  TCreateTicketReq,
  TGetTicketRes,
  TPutTicketReq
} from '../types/TTicket';

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
 * チケット詳細の取得
 */
export const getTicket = async (ticketId: string): Promise<TGetTicketRes> => {
  const response = await axios.get(
    `http://localhost:4001/api/tickets/${ticketId}`
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
/**
 * チケットの新規作成
 */
export const updateTicket = async ({
  req,
  ticketId
}: {
  req: TPutTicketReq;
  ticketId: string;
}): Promise<TGetTicketRes> => {
  const response = await axios.put(
    `http://localhost:4001/api/tickets/${ticketId}`,
    req
  );
  return response.data;
};
/**
 * チケットの削除
 */
export const deleteTicket = async (
  ticketId: string
): Promise<TGetTicketRes> => {
  const response = await axios.delete(
    `http://localhost:4001/api/tickets/${ticketId}`
  );
  return response.data;
};
