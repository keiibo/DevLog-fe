import React from 'react';
import { Select as AntDSelect } from 'antd';
import { SelectProps } from 'antd/es/select';

type TProps = SelectProps & {
  children: React.ReactNode;
};

export const Select = ({ children, ...props }: TProps): React.JSX.Element => {
  return <AntDSelect {...props}>{children}</AntDSelect>;
};
