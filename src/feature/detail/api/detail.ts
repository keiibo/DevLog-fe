import axios from 'axios';
import { setConfig, sgetBaseUrl } from '../../auth/api/auth';
import {
  TDeleteLinkIconReq,
  TPostLinkIconsReq,
  TPostLinkIconsRes
} from '../types/TDetail';
import { TUpdateProjectReq } from '../types/TProject';

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

/**
 * リンクアイコンの削除
 */
export const deleteLinkIcon = async (
  req: TDeleteLinkIconReq
): Promise<TPostLinkIconsRes> => {
  const response = await axios.delete(
    `${sgetBaseUrl()}/api/detail/linkIcon/${req.projectId}/${req.uuid}`,
    setConfig()
  );
  return response.data;
};

/**
 * プロジェクト更新
 */
export const updateProject = async ({
  req,
  projectId
}: {
  req: TUpdateProjectReq;
  projectId: string;
}) => {
  const response = await axios.patch(
    `${sgetBaseUrl()}/api/project/${projectId}`,
    req,
    setConfig()
  );
  return response.data;
};
