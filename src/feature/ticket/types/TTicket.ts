import { TValueOf } from '../../../lib/type';

export type TTicket = {
  _id: number;
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
  mileStone: TMileStone | null;
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
  mileStone: string | null;
  createdAt: string;
  completedAt: string | null;
};
export type TPutTicketReq = Omit<TTicket, '_id' | 'ticketId' | 'createdAt'>;
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
  mileStone: {
    uuid: string;
    name: string;
    version: string;
  };
  updateTicketIds: string[];
};

export type TGetMileStoneRes = {
  projectId: string;
  uuid: string;
  name: string;
  version: string;
};
