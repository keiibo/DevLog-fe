import axios from 'axios';
import {
  TCreateMileStoneReq,
  TGetMileStoneRes,
  TUpdateMileStoneReq
} from '../types/TTicket';
import { setConfig, sgetBaseUrl } from '../../../lib/api';

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

/**
 * マイルストーン更新
 */
export const updateMileStones = async (
  req: TUpdateMileStoneReq
): Promise<TGetMileStoneRes[]> => {
  const { projectId, updateMileStones } = req;
  const res = await axios.put(
    `${sgetBaseUrl()}/api/mileStones/update/${projectId}`,
    updateMileStones,
    setConfig()
  );
  return res.data;
};
