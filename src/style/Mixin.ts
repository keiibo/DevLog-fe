import { css } from 'styled-components';
import { Colors } from './Colors';

// Text
export const mixinMainColor = css`
  color: ${Colors.MAIN};
`;
export const mixinTextColor = css`
  color: ${Colors.TEXT};
`;
export const mixinTextDarkColor = css`
  color: ${Colors.TEXT_DARK};
`;
export const mixinWhiteColor = css`
  color: ${Colors.WHITE};
`;
export const mixinDangerColor = css`
  color: ${Colors.RED};
`;
export const mixinPurpleColor = css`
  color: ${Colors.PURPLE};
`;

// Bg
export const mixinBgMain = css`
  background-color: ${Colors.MAIN};
`;
export const mixinBgText = css`
  background-color: ${Colors.TEXT};
`;
export const mixinBgTextDark = css`
  background-color: ${Colors.TEXT_DARK};
`;
export const mixinBgMainLight = css`
  background-color: ${Colors.MAIN_LIGHT};
`;
export const mixinBgWhite = css`
  background-color: ${Colors.WHITE};
`;

// border-radius
export const mixinBorderRadius4px = css`
  border-radius: 4px;
`;
export const mixinBorderRadius8px = css`
  border-radius: 8px;
`;
export const mixinBorderRadius12px = css`
  border-radius: 12px;
`;
export const mixinBorderRadius24px = css`
  border-radius: 24px;
`;

// padding
export const mixinPadding4px = css`
  padding: 4px;
`;
export const mixinPadding8px = css`
  padding: 8px;
`;
export const mixinPadding12px = css`
  padding: 12px;
`;
export const mixinPadding24px = css`
  padding: 24px;
`;

// margin
export const mixinMargin0 = css`
  margin: 0;
`;
export const mixinMargin8px = css`
  margin: 8px;
`;
export const mixinMargin12px = css`
  margin: 12px;
`;
export const mixinMargin24px = css`
  margin: 24px;
`;

// font-size
export const mixinNormalFontSize12px = css`
  font-size: 12px;
`;
export const mixinNormalFontSize16px = css`
  font-size: 16px;
`;
export const mixinNormalFontSize24px = css`
  font-size: 24px;
`;
export const mixinNormalFontSize40px = css`
  font-size: 40px;
`;
export const mixinBoldFontSize12px = css`
  font-size: 12px;
  font-weight: bold;
`;
export const mixinBoldFontSize16px = css`
  font-size: 16px;
  font-weight: bold;
`;
export const mixinBoldFontSize24px = css`
  font-size: 24px;
  font-weight: bold;
`;
export const mixinBoldFontSize40px = css`
  font-size: 40px;
  font-weight: bold;
`;
