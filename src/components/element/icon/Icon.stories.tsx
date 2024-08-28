import { Colors } from '../../../style/Colors';
import { Icon, IconType } from './Icon';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'elements/Icon',
  argTypes: {
    type: {
      control: 'select', // selectタイプのコントロールを設定
      options: Object.values(IconType), // IconTypeの値をオプションとして設定
      defaultValue: IconType.GITHUB
    }
  },
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  component: Icon
} satisfies Meta<typeof Icon>;
export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    type: IconType.GITHUB
  }
};
