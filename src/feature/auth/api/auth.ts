import axios from 'axios';
import {
  TPostCreateAccountReq,
  TPostCreateAccountRes,
  TPostLoginReq,
  TPostLoginRes
} from '../types/TAuth';

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
    const response = await axios.post<TPostCreateAccountRes>(
      `${sgetBaseUrl()}/api/user`,
      req,
      setConfig()
    );
    return response.data;
  } catch (error) {
    throw error; // その他のエラーは再スロー
  }
};

/**
 * Bearerの設定を付与する
 */
export const setConfig = (): {} => {
  const token = localStorage.getItem('token');
  if (token === '') {
    // eslint-disable-next-line no-console
    console.error('tokenが空です');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}` // トークンをBearerスキームで設定
    }
  };
};

/**
 * baseUrlの決定
 */
export const sgetBaseUrl = (): string => {
  return import.meta.env.VITE_BACKEND_URL || '';
};
