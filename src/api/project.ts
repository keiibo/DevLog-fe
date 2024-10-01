import axios from 'axios';
import {
  TCreateProjectReq,
  TGetProjectRes
} from '../feature/detail/types/TProject';
import { setConfig, sgetBaseUrl } from '../lib/api';

/**
 * プロジェクト一覧の取得
 */
export const getProjects = async (
  userId: string
): Promise<TGetProjectRes[]> => {
  const response = await axios.get(
    `${sgetBaseUrl()}/api/project/all/${userId}`,
    setConfig()
  );
  return response.data;
};

/**
 * プロジェクトの取得
 */
export const getProject = async (
  projectId: string
): Promise<TGetProjectRes> => {
  const response = await axios.get(
    `${sgetBaseUrl()}/api/project/${projectId}`,
    setConfig()
  );
  return response.data;
};

/**
 * プロジェクトの新規作成
 */
export const createProject = async (
  req: TCreateProjectReq
): Promise<TGetProjectRes> => {
  const response = await axios.post<TGetProjectRes>(
    '${sgetBaseUrl]api/project',
    req,
    setConfig()
  );
  return response.data;
};
