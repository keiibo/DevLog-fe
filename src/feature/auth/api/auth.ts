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
