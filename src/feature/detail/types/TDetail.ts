import { TIconType } from '../../../components/element/icon/Icon';

export type TLinkIconListData = {
  projectId: string;
  linkIconList: TLinkIcon[];
};

export type TLinkIcon = {
  name: string;
  url: string;
  iconType: TIconType;
  uuid: string;
};

export type TPostLinkIconsReq = TLinkIconListData;
export type TPostLinkIconsRes = TLinkIconListData;
export type TDeleteLinkIconReq = {
  projectId: string;
  uuid: string;
};
