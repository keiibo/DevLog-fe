import axios from 'axios';
import {
  TCreateTicketReq,
  TGetTicketRes,
  TPutTicketReq
} from '../types/TTicket';
import { setConfig, sgetBaseUrl } from '../../auth/api/auth';

/**
 * チケット一覧の取得
 */
export const getTickets = async (
  projectId: string
): Promise<TGetTicketRes[]> => {
  const response = await axios.get(
    `${sgetBaseUrl()}/api/tickets?projectId=${projectId}`,
    setConfig()
  );
  return response.data;
};

/**
 * チケット詳細の取得
 */
export const getTicket = async (ticketId: string): Promise<TGetTicketRes> => {
  const response = await axios.get(
    `${sgetBaseUrl()}/api/tickets/${ticketId}`,
    setConfig()
  );
  return response.data;
};

/**
 * チケットの新規作成
 */
export const createTicket = async (
  req: TCreateTicketReq
): Promise<TGetTicketRes> => {
  const response = await axios.post(
    `${sgetBaseUrl()}/api/tickets`,
    req,
    setConfig()
  );
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
    `${sgetBaseUrl()}/api/tickets/${ticketId}`,
    req,
    setConfig()
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
    `${sgetBaseUrl()}/api/tickets/${ticketId}`,
    setConfig()
  );
  return response.data;
};
