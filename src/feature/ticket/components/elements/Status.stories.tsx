import { Meta, StoryObj } from '@storybook/react';
import { Status as StatusEnum } from '../../types/TTicket';
import { Colors } from '../../../../style/Colors';
import { Status } from './Status';

const meta = {
  title: 'feature/ticket/elements/Status',
  component: Status,
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
    status: {
      control: 'radio',
      options: [
        StatusEnum.NOT_STARTED,
        StatusEnum.UNDER_CONSTRUCTION,
        StatusEnum.COMPLETED
      ]
    }
  }
} satisfies Meta<typeof Status>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    status: StatusEnum.NOT_STARTED
  }
};
