import React from 'react';
import { Form as AntForm, FormProps } from 'antd';

type TProps = FormProps & {
  children: React.ReactNode;
};

export const Form = ({ children, ...props }: TProps): React.JSX.Element => {
  return <AntForm {...props}>{children}</AntForm>;
};
