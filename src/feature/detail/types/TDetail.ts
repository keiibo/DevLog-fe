import { TIconType } from '../../../components/element/icon/Icon';

export type TLinkIcon = {
  projectId: string;
  linkIconList: TLinkIconList[];
};

export type TLinkIconList = {
  name: string;
  url: string;
  iconType: TIconType;
};

export type TPostLinkIconsReq = TLinkIcon;
export type TPostLinkIconsRes = TLinkIcon;

