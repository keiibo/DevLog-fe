import axios from 'axios';
import {
  TDeleteNoteReq,
  TGetNoteDetailReq,
  TGetNoteRes,
  TPostNoteReq,
  TUpdateNoteReq
} from '../types/TNote';
import { setConfig, sgetBaseUrl } from '../../../lib/api';

/**
 * ノート一覧の取得
 */
export const getNotes = async (projectId: string): Promise<TGetNoteRes[]> => {
  const response = await axios.get(
    `${sgetBaseUrl()}/api/note/${projectId}`,
    setConfig()
  );
  return response.data;
};

/**
 * ノートの詳細取得
 */
export const getNoteDetail = async (
  req: TGetNoteDetailReq
): Promise<TGetNoteRes> => {
  const response = await axios.get(
    `${sgetBaseUrl()}/api/note/${req.projectId}/${req.uuid}`,
    setConfig()
  );
  return response.data;
};

/**
 * 新規ノートの作成
 */
export const createNote = async (req: TPostNoteReq): Promise<TGetNoteRes> => {
  const response = await axios.post(
    `${sgetBaseUrl()}/api/note/create/${req.projectId}`,
    req.req,
    setConfig()
  );
  return response.data;
};

/**
 * ノートの更新
 */
export const updateNote = async (req: TUpdateNoteReq): Promise<TGetNoteRes> => {
  const response = await axios.put(
    `${sgetBaseUrl()}/api/note/update/${req.projectId}`,
    req.req,
    setConfig()
  );
  return response.data;
};

/**
 * ノートの削除
 */
export const deleteNote = async (req: TDeleteNoteReq): Promise<void> => {
  await axios.delete(
    `${sgetBaseUrl()}/api/note/${req.projectId}/${req.uuid}`,
    setConfig()
  );
};
