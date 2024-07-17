import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../../constant/Colors';
import { LimitDate } from './LimitDate';

const meta = {
  title: 'feature/ticket/elements/LimitDate',
  component: LimitDate,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  argTypes: {
    limitStartYm: {
      control: 'date'
    },
    limitEndYm: {
      control: 'date'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof LimitDate>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: { limitStartYm: '2024-01-01', limitEndYm: '2024-01-01' }
};

export const NoStartYm: TStory = {
  args: { limitEndYm: '2024-01-01' }
};
export const NoEndYm: TStory = {
  args: { limitStartYm: '2024-01-01' }
};
export const NoLimit: TStory = {
  args: {}
};
