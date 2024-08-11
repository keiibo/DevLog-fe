import React from 'react';
import styled from 'styled-components';
import { mixinBgMain, mixinTextColor } from '../../../style/Mixin';

type TProps = {
  children: React.ReactNode;
  center?: boolean;
};

/**
 * Rootを通らない全画面系のベースレイアウト
 */
export const BaseLayout = ({ children, center }: TProps): React.JSX.Element => {
  return <StyledWrapper $center={!!center}>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div<{ $center: boolean }>`
  ${mixinBgMain}
  ${mixinTextColor}
  min-height: 100vh;
  display: flex;
  ${({ $center }) => ($center ? 'align-items: center;' : '')};
  ${({ $center }) => ($center ? 'justify-content: center;' : '')};
`;
