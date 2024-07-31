import { Colors } from '../../../style/Colors';
import { Input } from './Input';

import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'elements/Input',
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  component: Input,
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default value of the input'
    },
    width: {
      control: { type: 'number' }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Input>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    defaultValue: 'デフォルト',
    placeholder: 'place'
  }
};
