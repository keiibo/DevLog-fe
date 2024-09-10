import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../../style/Colors';
import { Category } from './Category';

const meta = {
  title: 'feature/ticket/elements/Category',
  component: Category,
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
} satisfies Meta<typeof Category>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    category: {
      uuid: 'test',
      name: 'test'
    }
  }
};
export const LongText: TStory = {
  args: {
    category: {
      uuid: 'test',
      name: 'testtesttesttesttesttesttesttesttesttest'
    }
  }
};
