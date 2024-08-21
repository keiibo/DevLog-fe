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
  argTypes: {
    label: {
      control: 'text', // テキストコントロールを使用してラベルを編集可能にします。
      description: '表示されるカテゴリのラベル' // argTypesの説明を提供
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Category>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    label: '実装'
  }
};
export const LongText: TStory = {
  args: {
    label: '実装aaaaaあああああaaaaaああああ'
  }
};
