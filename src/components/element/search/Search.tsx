import React from 'react';
import { Input } from '../input/Input';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { mixinTextDarkColor } from '../../../style/Mixin';

// propsの型定義
type TProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 入力値の変更を親に渡す
  width?: string;
};

export const Search = ({
  placeholder = '検索',
  value,
  onChange,
  width = '100%'
}: TProps): React.JSX.Element => {
  return (
    <Input
      prefix={<StyledSearchOutlined />}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // 親コンポーネントからのonChangeハンドラを適用
      width={width}
    />
  );
};

const StyledSearchOutlined = styled(SearchOutlined)`
  ${mixinTextDarkColor}
`;
