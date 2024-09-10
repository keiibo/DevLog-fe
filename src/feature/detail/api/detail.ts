import axios from 'axios';
import { setConfig, sgetBaseUrl } from '../../auth/api/auth';
import { TPostLinkIconsReq, TPostLinkIconsRes } from '../types/TDetail';

/**
 * リンクアイコンの作成
 */
export const postLinkIcons = async (
  req: TPostLinkIconsReq
): Promise<TPostLinkIconsRes> => {
  const response = await axios.post(
    `${sgetBaseUrl()}/api/detail/linkIcon`,
    req,
    setConfig()
  );
  return response.data;
};
