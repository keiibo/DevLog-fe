// CustomDatePicker.stories.tsx
import { DatePicker } from './DatePicker';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'elements/DatePicker',
  component: DatePicker
} satisfies Meta<typeof DatePicker>;
export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    format: 'YYYY/MM/DD'
  }
};
