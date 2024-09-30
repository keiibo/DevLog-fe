import axios from 'axios';
import { setConfig, sgetBaseUrl } from '../../auth/api/auth';
import { TCreateMileStoneReq, TGetMileStoneRes } from '../types/TTicket';

/**
 * マイルストーンの新規作成
 */
export const createMileStone = async (
  req: TCreateMileStoneReq
): Promise<void> => {
  await axios.post(`${sgetBaseUrl()}/api/tickets/mileStone`, req, setConfig());
};

/**
 * マイルストーン一覧の取得
 */
export const getMileStones = async (
  projectId: string
): Promise<TGetMileStoneRes[]> => {
  const res = await axios.get(
    `${sgetBaseUrl()}/api/tickets/mileStone/${projectId}`,
    setConfig()
  );
  return res.data;
};
