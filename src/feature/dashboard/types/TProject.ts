import { TLinkIconList } from '../../detail/types/TDetail';

export type TGetProjectRes = {
  _id: string;
  projectId: string;
  name: string;
  detail: string;
  limitDate: string;
  linkIconList: TLinkIconList[];
};

export type TCreateProjectReq = {
  name: string;
  detail: string;
  limitDate: string;
  projectId: string;
};
