import React from 'react';
import { Form, FormItemProps } from 'antd';
import { styled } from 'styled-components';
import { Colors } from '../../../constant/Colors';

type TProps = FormItemProps & {
  children: React.ReactNode;
};

export const FormItem = ({ children, ...props }: TProps): React.JSX.Element => {
  return <StyledFormItem {...props}>{children}</StyledFormItem>;
};
const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: ${Colors.TEXT};
  }
`;
