import { Meta, StoryObj } from '@storybook/react';
import { InputWithButton } from './InputWithButton';

const meta = {
  title: 'elements/InputWithButton',
  component: InputWithButton,
  parameters: {},
  argTypes: {
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    width: { control: 'number' }
  },
  tags: ['autodocs']
} satisfies Meta<typeof InputWithButton>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    defaultValue: 'デフォルト',
    placeholder: 'プレースホルダー',
    width: 300
  }
};
