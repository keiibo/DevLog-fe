import { Meta, StoryObj } from '@storybook/react';
import { InputWithButton } from './InputWithButton';
import { Colors } from '../../../constant/Colors';

const meta = {
  title: 'elements/InputWithButton',
  component: InputWithButton,
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
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    width: { control: 'number' },
    buttonText: { control: 'text' }
  },
  tags: ['autodocs']
} satisfies Meta<typeof InputWithButton>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    placeholder: 'プレースホルダー',
    width: 200,
    buttonText: '送信'
  }
};
