import { TValueOf } from '../../../lib/type';

export type TTicket = {
  _id: number;
  ticketId: string;
  projectId: string;
  labelColorType: TLabelColorType;
  title: string;
  isDeletable: boolean;
  limitStartYm?: string;
  limitEndYm?: string;
  priority: TPriority;
  status: TStatus;
};

export const LabelColorType = {
  WHITE: 'white',
  LIGHT_BLUE: 'lightBlue',
  BLUE: 'blue',
  RED: 'red'
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

export type TGetTicketRes = TTicket;
export type TCreateTicketReq = Omit<TTicket, '_id' | 'ticketId'>;
