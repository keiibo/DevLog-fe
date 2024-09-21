import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../style/Colors';
import { Search } from './Search';

const meta = {
  title: 'elements/Search',
  component: Search,
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
} satisfies Meta<typeof Search>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {}
};
