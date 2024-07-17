// CustomDatePicker.stories.tsx
import { Colors } from '../../../constant/Colors';
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
    format: 'YYYY/MM/DD'
  }
};
