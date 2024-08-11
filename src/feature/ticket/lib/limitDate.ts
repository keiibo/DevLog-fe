import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
/**
 * 引数の日付が今日以前かどうか
 */
export const isOverLimitDate = (ym: string | undefined): boolean => {
  return dayjs(ym).isSameOrBefore(dayjs(), 'day');
};
