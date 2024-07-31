import { Status, TStatus } from '../types/TTicket';

export const getStatusStr = (status: TStatus): string => {
  switch (status) {
    case Status.NOT_STARTED:
      return '未着手';
    case Status.UNDER_CONSTRUCTION:
      return '着手中';
    case Status.COMPLETED:
      return '完了';

    default:
      return '';
  }
};
