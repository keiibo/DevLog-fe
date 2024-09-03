import axios from 'axios';
import { setConfig } from '../../auth/api/auth';
import { TPostLinkIconsReq, TPostLinkIconsRes } from '../types/TDetail';

/**
 * リンクアイコンの作成
 */
export const postLinkIcons = async (
  req: TPostLinkIconsReq
): Promise<TPostLinkIconsRes> => {
  const response = await axios.post(
    `http://localhost:4001/api/detail/linkIcon`,
    req,
    setConfig()
  );
  return response.data;
};
