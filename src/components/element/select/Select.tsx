import React, { forwardRef } from 'react';
import { Select as AntDSelect, GetRef } from 'antd';
import { SelectProps } from 'antd/es/select';

type TProps = SelectProps<any> & {
  // ここでのanyはSelectのvalueの型に応じて変更可能
  children: React.ReactNode;
};
type SelectRefType = GetRef<typeof AntDSelect>; // BaseSelectRef

export const Select = forwardRef<SelectRefType, TProps>((props, ref) => (
  <AntDSelect {...props} ref={ref}>
    {props.children}
  </AntDSelect>
));
