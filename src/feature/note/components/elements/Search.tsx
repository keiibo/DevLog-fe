import React from 'react';
import { Input } from '../../../../components/element/input/Input';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { mixinTextDarkColor } from '../../../../style/Mixin';

export const Search = (): React.JSX.Element => {
  return (
    <Input
      prefix={<StyledSearchOutlined />}
      placeholder="ノートを検索"
      width={'100%'}
    />
  );
};

const StyledSearchOutlined = styled(SearchOutlined)`
  ${mixinTextDarkColor}
`;
