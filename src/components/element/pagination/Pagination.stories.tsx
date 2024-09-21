import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../style/Colors';
import { Pagination } from './Pagination';

const meta = {
  title: 'elements/Pagination',
  component: Pagination,
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  argTypes: {},
  tags: ['autodocs']
} satisfies Meta<typeof Pagination>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    current: 1,
    total: 50
  }
};
