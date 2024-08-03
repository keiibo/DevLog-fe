import { Colors, LabelColors } from '../../../style/Colors';
import { LabelColorType, TLabelColorType } from '../types/TTicket';

export const getLabelColor = (labelColor: TLabelColorType): string => {
  switch (labelColor) {
    case LabelColorType.BLUE:
      return LabelColors.BLUE_ACCENT;
    case LabelColorType.LIGHT_BLUE:
      return LabelColors.LIGHT_BLUE_ACCENT;
    case LabelColorType.WHITE:
      return LabelColors.WHITE;
    case LabelColorType.GREEN:
      return LabelColors.GREEN;
    case LabelColorType.RED:
      return LabelColors.RED;
    case LabelColorType.PURPLE:
      return LabelColors.PURPLE;
    default:
      return '';
  }
};

export const getTitleTextColor = (
  mode: string,
  labelColorType: TLabelColorType
) => {
  switch (mode) {
    case 'detail':
      switch (labelColorType) {
        case LabelColorType.WHITE:
          return Colors.MAIN;
        default:
          return Colors.MAIN;
      }
      break;
    case 'list':
      return Colors.MAIN;
    default:
      return Colors.MAIN;
  }
};

export const getLabelColorStr = (labelColorType: TLabelColorType): string => {
  switch (labelColorType) {
    case LabelColorType.BLUE:
      return '青';
    case LabelColorType.LIGHT_BLUE:
      return '水色';
    case LabelColorType.WHITE:
      return '白';
    case LabelColorType.GREEN:
      return '緑';
    case LabelColorType.PURPLE:
      return '紫';
    case LabelColorType.RED:
      return '赤';
    default:
      return '';
  }
};
