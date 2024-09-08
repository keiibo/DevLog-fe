import { TValueOf } from '../../../lib/type';

export const SortQueryCategoryType = {
  CREATE_AT: 'createAt',
  LIMIT_DATE: 'limitDate',
  PRIORITY: 'priority'
};
export type TSortQueryCategoryType = TValueOf<typeof SortQueryCategoryType>;

export const HowToSortQueryType = {
  DESCENDING: 'descending',
  ASCENDING: 'ascending'
};
export type THowToSortQueryType = TValueOf<typeof HowToSortQueryType>;
