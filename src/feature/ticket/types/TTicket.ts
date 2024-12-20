import { TValueOf } from '../../../lib/type';

export type TTicket = {
  id: number;
  ticketId: string;
  projectId: string;
  detail: string | null;
  labelColorType: TLabelColorType;
  title: string;
  isDeletable: boolean;
  limitStartYm?: string;
  limitEndYm?: string;
  priority: TPriority;
  status: TStatus;
  categories?: TCategory[];
  mileStoneUuid: string | null;
  createdAt: string;
  completedAt: string | null;
};

export const LabelColorType = {
  WHITE: 'white',
  LIGHT_BLUE: 'lightBlue',
  BLUE: 'blue',
  RED: 'red',
  GREEN: 'green',
  PURPLE: 'purple'
};
export type TLabelColorType = TValueOf<typeof LabelColorType>;

export const Priority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};
export type TPriority = TValueOf<typeof Priority>;

export const Status = {
  NOT_STARTED: 'notStarted',
  UNDER_CONSTRUCTION: 'underConstruction',
  COMPLETED: 'completed'
};
export type TStatus = TValueOf<typeof Status>;

export type TCategory = {
  uuid: string;
  name: string;
};

export type TMileStone = {
  uuid: string;
  name: string;
  version: string | null;
};

export type TGetTicketRes = TTicket;
export type TCreateTicketReq = {
  projectId: string;
  detail: string | null;
  labelColorType: TLabelColorType;
  title: string;
  isDeletable: boolean;
  limitStartYm?: string;
  limitEndYm?: string;
  priority: TPriority;
  status: TStatus;
  categories?: TCategory[];
  mileStoneUuid: string | null;
  createdAt: string;
  completedAt: string | null;
};
export type TPutTicketReq = Omit<TTicket, 'id' | 'ticketId' | 'createdAt'>;
export type TCreateCategoryReq = {
  projectId: string;
  categories: TCategory[];
};

export type TMGetCategoryRes = {
  projectId: string;
  categories: TCategory[];
};

export type TCreateMileStoneReq = {
  projectId: string;
  mileStone: TMileStone;
  updateTicketIds: string[];
};

export type TGetMileStoneRes = {
  id: number;
  projectId: string;
  uuid: string;
  name: string;
  version: string | null;
};

export type TUpdateMileStoneReq = {
  projectId: string;
  updateMileStones: TMileStone[];
};

export type TTemplate = {
  projectId: string;
  uuid: string;
  title: string;
  content: string;
};

export type TGetTemplateRes = TTemplate;
export type TUpdateTemplateRequest = {
  projectId: string;
  req: {
    uuid: string;
    title: string;
    content: string;
  };
};

export type TCreateTemplateReq = {
  projectId: string;
  req: {
    uuid: string;
    title: string;
    content: string;
  };
};
