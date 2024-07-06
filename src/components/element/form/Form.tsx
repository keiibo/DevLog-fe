import React, { forwardRef } from 'react';
import { Form as AntForm, FormInstance, FormProps } from 'antd';

type TProps = FormProps & {
  children: React.ReactNode;
};

export const Form = forwardRef<FormInstance, TProps>(
  ({ children, ...props }: TProps, ref): React.JSX.Element => {
    return (
      <AntForm {...props} ref={ref}>
        {children}
      </AntForm>
    );
  }
);
