import { TValueOf } from '../lib/type';

export const Colors = {
  MAIN: '#22272E',
  MAIN_LIGHT: '#3C4550',
  MAIN_TRANSPARENT: '#22272ECC',
  TEXT: '#CFD8E0',
  TEXT_DARK: '#7F8890',
  BLUE_ACCENT: '#539BF5',
  LIGHT_BLUE_ACCENT: '#76E3EA',
  WHITE: '#F4F5F7',
  PURPLE: '#AA5E84',
  RED: '#F14040'
} as const;

export type TColors = TValueOf<typeof Colors>;
