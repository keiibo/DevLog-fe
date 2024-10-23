import axios from 'axios';
import {
  TCreateTemplateReq,
  TGetTemplateRes,
  TUpdateTemplateRequest
} from '../types/TTicket';
import { setConfig, sgetBaseUrl } from '../../../lib/api';

/**
 * テンプレート一覧の取得
 */
export const getTemplates = async (
  projectId: string
): Promise<TGetTemplateRes[]> => {
  const res = await axios.get(
    `${sgetBaseUrl()}/api/tickets/template/${projectId}`,
    setConfig()
  );
  return res.data;
};

/**
 * テンプレートの新規作成
 */
export const createTemplate = async (
  req: TCreateTemplateReq
): Promise<TGetTemplateRes[]> => {
  const res = await axios.post(
    `${sgetBaseUrl()}/api/tickets/template/${req.projectId}`,
    req.req,
    setConfig()
  );
  return res.data;
};

/**
 * テンプレートの更新
 */
export const updateTemplate = async (
  req: TUpdateTemplateRequest
): Promise<TGetTemplateRes[]> => {
  const res = await axios.put(
    `${sgetBaseUrl()}/api/tickets/template/${req.projectId}`,
    req.req,
    setConfig()
  );
  return res.data;
};
