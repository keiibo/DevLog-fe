import React from 'react';
import { Pagination as AdPagination, PaginationProps } from 'antd';
type TProps = PaginationProps;

export const Pagination = (props: TProps): React.JSX.Element => {
  return <AdPagination {...props} />;
};
