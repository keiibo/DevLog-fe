import { Priority, TPriority } from '../types/TTicket';

export const getPriorityStr = (priority: TPriority): string => {
  switch (priority) {
    case Priority.HIGH:
      return '高';
    case Priority.MEDIUM:
      return '中';
    case Priority.LOW:
      return '低';

    default:
      return '';
  }
};
