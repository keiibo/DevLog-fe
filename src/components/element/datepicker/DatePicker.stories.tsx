// CustomDatePicker.stories.tsx
import { DateFormat } from '../../../constant/DateFormat';
import { Colors } from '../../../style/Colors';
import DatePicker from './DatePicker';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'elements/DatePicker',
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  component: DatePicker
} satisfies Meta<typeof DatePicker>;
export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    format: DateFormat.SLASH
  }
};
