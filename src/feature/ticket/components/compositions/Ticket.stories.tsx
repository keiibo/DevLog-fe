import { Meta, StoryObj } from '@storybook/react';
import { Ticket } from './Ticket';
import { Colors } from '../../../../constant/Colors';
import { Priority, Status } from '../../types/TTicket';

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
      _id: 1,
      ticketId: 'TestPJ-1',
      projectId: '100',
      labelColorType: 'blue',
      title: 'Example Ticket Title',
      isDeletable: true,
      limitStartYm: '2022-01',
      limitEndYm: '2022-12',
      priority: Priority.HIGH,
      status: Status.UNDER_CONSTRUCTION
    }
  }
};

export const CantDelete: TStory = {
  args: {
    ticket: {
      _id: 1,
      ticketId: 'TestPJ-1',
      projectId: '100',
      labelColorType: 'blue',
      title: 'Example Ticket Title',
      isDeletable: false,
      limitStartYm: '2022-01-01',
      limitEndYm: '2022-12-02',
      priority: Priority.HIGH,
      status: Status.NOT_STARTED
    }
  }
};
