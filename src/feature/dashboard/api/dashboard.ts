import axios from 'axios';
import { TCreateProjectReq, TGetProjectRes } from '../types/TProject';

/**
 * プロジェクト一覧の取得
 */
export const getProjects = async (
  userId: string
): Promise<TGetProjectRes[]> => {
  const response = await axios.get(
    `http://localhost:4001/api/project/all/${userId}`
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
    `http://localhost:4001/api/project/${projectId}`
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
    'http://localhost:4001/api/project',
    req
  );
  return response.data;
};
