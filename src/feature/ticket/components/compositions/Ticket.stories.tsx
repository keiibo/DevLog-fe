import { Meta, StoryObj } from '@storybook/react';
import { Ticket } from './Ticket';
import { Colors } from '../../../../constant/Colors';

const meta = {
  title: 'feature/ticket/compositions/Ticket',
  component: Ticket,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  argTypes: {
    ticket: {
      control: 'object',
      description: 'The ticket data object to display'
    }
  }
} satisfies Meta<typeof Ticket>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    ticket: {
      id: 1,
      labelColorType: 'blue',
      title: 'Example Ticket Title',
      isDeletable: true,
      limitStartYm: '2022-01',
      limitEndYm: '2022-12',
      priority: 'high'
    }
  }
};

export const CantDelete: TStory = {
  args: {
    ticket: {
      id: 1,
      labelColorType: 'blue',
      title: 'Example Ticket Title',
      isDeletable: false,
      limitStartYm: '2022-01-01',
      limitEndYm: '2022-12-02',
      priority: 'high'
    }
  }
};
