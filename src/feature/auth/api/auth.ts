import axios from 'axios';
import {
  TPostCreateAccountReq,
  TPostCreateAccountRes,
  TPostLoginReq,
  TPostLoginRes
} from '../types/TAuth';
import { mockApiCli, setConfig, sgetBaseUrl } from '../../../lib/api';

/**
 * ログイン
 */
export const login = async (req: TPostLoginReq): Promise<TPostLoginRes> => {
  const response = await axios.post<TPostLoginRes>(
    `${sgetBaseUrl()}/api/login`,
    req
  );
  return response.data;
};

/**
 *  ME
 */
export const me = async (): Promise<TPostLoginRes> => {
  try {
    const response = await axios.get<TPostLoginRes>(
      `${sgetBaseUrl()}/api/me`,
      setConfig()
    );
    return response.data;
  } catch (error) {
    throw error; // その他のエラーは再スロー
  }
};

/**
 * POST:ユーザー新規作成
 */
export const createAccount = async (
  req: TPostCreateAccountReq
): Promise<TPostCreateAccountRes> => {
  try {
    const response = await mockApiCli.post<TPostCreateAccountRes>(
      `${sgetBaseUrl()}/api/user`,
      req,
      setConfig()
    );
    return response.data;
  } catch (error) {
    throw error; // その他のエラーは再スロー
  }
};
