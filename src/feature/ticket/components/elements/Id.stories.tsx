import { Meta, StoryObj } from '@storybook/react';
import { Id } from './Id';

const meta = {
  title: 'feature/ticket/elements/Id',
  component: Id,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'number',
      default: 1
    }
  }
} satisfies Meta<typeof Id>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    id: 'SMPLE-1'
  }
};
