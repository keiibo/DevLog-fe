import { Meta, StoryObj } from '@storybook/react';
import { CategoryLabel } from './CategoryLabel';
import { Colors } from '../../../../style/Colors';

const meta = {
  title: 'feature/ticket/elements/CategoryLabel',
  component: CategoryLabel,
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
} satisfies Meta<typeof CategoryLabel>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    label: 'ラベルテキスト'
  }
};
