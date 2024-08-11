import dayjs from 'dayjs';

/**
 * 引数の日付が今日以前かどうか
 */
export const isOverLimitDate = (ym: string | undefined): boolean => {
  return dayjs(ym).isSameOrBefore(dayjs(), 'day');
};
