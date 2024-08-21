import React from 'react';
import styled from 'styled-components';
import {
  mixinBgText,
  mixinBorderRadius8px,
  mixinNormalFontSize12px,
  mixinWhiteColor
} from '../../../../style/Mixin';

type TProps = {
  label: string;
};

export const Category = ({ label }: TProps): React.JSX.Element => {
  return <StyledCategoryContainer>{label}</StyledCategoryContainer>;
};

const StyledCategoryContainer = styled.div`
  width: fit-content;
  padding: 2px 4px;
  ${mixinNormalFontSize12px}
  ${mixinBorderRadius8px}
  ${mixinBgText}
  ${mixinWhiteColor}
`;
