import { Colors } from '../../../style/Colors';
import { LabelColorType, TLabelColorType } from '../types/TTicket';

export const getLabelColor = (labelColor: TLabelColorType): string => {
  switch (labelColor) {
    case LabelColorType.BLUE:
      return Colors.BLUE_ACCENT;
    case LabelColorType.LIGHT_BLUE:
      return Colors.LIGHT_BLUE_ACCENT;
    case LabelColorType.WHITE:
      return Colors.WHITE;
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
    default:
      return '';
  }
};
