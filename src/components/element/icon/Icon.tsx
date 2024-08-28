import React from 'react';
import {
  BulbFilled,
  FileTextFilled,
  GithubFilled,
  PlusOutlined,
  ReadFilled,
  ToolFilled
} from '@ant-design/icons';
import { TValueOf } from '../../../lib/type';
import { styled } from 'styled-components';
import { mixinTextColor } from '../../../style/Mixin';

export const IconType = {
  GITHUB: 'github',
  FILE: 'file',
  BOOK: 'book',
  SETTING: 'setting',
  LIGHT: 'light',
  PLUS: 'plus',
  NONE: 'none'
};
export type TIconType = TValueOf<typeof IconType>;

type TProps = {
  type: TIconType;
};

export const Icon = ({ type }: TProps): React.JSX.Element => {
  const icon = () => {
    const innerIcon = () => {
      switch (type) {
        case IconType.GITHUB:
          return <GithubFilled />;
        case IconType.FILE:
          return <FileTextFilled />;
        case IconType.BOOK:
          return <ReadFilled />;
        case IconType.LIGHT:
          return <BulbFilled />;
        case IconType.SETTING:
          return <ToolFilled />;
        case IconType.PLUS:
          return <PlusOutlined />;
        default:
          return;
      }
    };
    return <StyledIcon>{innerIcon()}</StyledIcon>;
  };

  return <div>{icon()}</div>;
};

const StyledIcon = styled.span`
  font-size: 48px;
  ${mixinTextColor}
`;
