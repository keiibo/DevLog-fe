import { TLinkIcon } from './TDetail';

export type TGetProjectRes = {
  _id: string;
  projectId: string;
  name: string;
  detail: string;
  limitDate: string;
  linkIconList: TLinkIcon[];
};

export type TCreateProjectReq = {
  name: string;
  detail: string;
  limitDate: string;
  projectId: string;
};

export type TUpdateProjectReq = {
  name: string;
  detail: string;
};
