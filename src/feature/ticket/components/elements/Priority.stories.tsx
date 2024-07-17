import { Meta, StoryObj } from '@storybook/react';
import { Priority } from './Priority';
import { Priority as PriorityEnum } from '../../types/TTicket';
import { Colors } from '../../../../constant/Colors';

const meta = {
  title: 'feature/ticket/elements/Priority',
  component: Priority,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'radio',
      options: [PriorityEnum.HIGH, PriorityEnum.MEDIUM, PriorityEnum.LOW]
    }
  }
} satisfies Meta<typeof Priority>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    priority: PriorityEnum.HIGH
  }
};
