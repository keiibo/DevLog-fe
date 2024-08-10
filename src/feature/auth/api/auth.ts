import axios from 'axios';
import { TPostLoginReq, TPostLoginRes } from '../types/TLogin';

/**
 * ログイン
 */
export const login = async (req: TPostLoginReq): Promise<TPostLoginRes> => {
  const response = await axios.post<TPostLoginRes>(
    'http://localhost:4001/api/login',
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
      'http://localhost:4001/api/me',
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
