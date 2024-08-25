import axios from 'axios';
import { setConfig } from '../../auth/api/auth';
import {
  TCategory,
  TCreateCategoryReq,
  TMGetCategoryRes
} from '../types/TTicket';

/**
 * カテゴリの新規作成
 */
export const createCategories = async (
  categories: TCreateCategoryReq
): Promise<void> => {
  await axios.post(
    `http://localhost:4001/api/tickets/category`,
    categories,
    setConfig()
  );
};

/**
 * カテゴリ一覧の取得
 */
export const getCategories = async (
  projectId: string
): Promise<TCategory[]> => {
  const res = await axios.get<TMGetCategoryRes>(
    `http://localhost:4001/api/tickets/category/${projectId}`,
    setConfig()
  );

  return res.data.categories;
};
