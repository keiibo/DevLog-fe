import React from 'react';
import { Form, FormItemProps } from 'antd';
import { styled } from 'styled-components';
import { mixinTextColor } from '../../../style/Mixin';

type TProps = FormItemProps & {
  children: React.ReactNode;
};

export const FormItem = ({ children, ...props }: TProps): React.JSX.Element => {
  return <StyledFormItem {...props}>{children}</StyledFormItem>;
};
const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label {
    text-align: left;
    label {
      height: fit-content;
      text-wrap: wrap;
      ${mixinTextColor}
    }
  }
  .ant-form-item-explain-error {
    padding: 4px 0;
  }
`;
