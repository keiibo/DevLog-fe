import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Storybookの設定
const meta = {
  title: 'elements/Button', // StorybookのUIに表示されるタイトル
  component: Button, // どのコンポーネントのストーリーかを指定
  argTypes: {
    // コンポーネントのpropsの制御
    onClick: { action: 'clicked' },
    type: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'link', 'text', 'danger']
    },
    width: {
      control: 'text'
    }
  },
  tags: ['autodocs'] // Storybookのドキュメントに自動で表示されるタグ
} satisfies Meta<typeof Button>;
export default meta;
type TStory = StoryObj<typeof meta>;

// デフォルトのButton
export const Default: TStory = {
  args: {
    type: 'primary',
    onClick: () => console.log('Clicked!'),
    children: 'Default Button'
  }
};

// プライマリータイプのButton
export const Primary: TStory = {
  args: {
    type: 'primary',
    children: 'Primary Button',
    onClick: () => console.log('Clicked!')
  }
};

// カスタム幅のButton
export const CustomWidth: TStory = {
  args: {
    width: '200px',
    children: 'Wide Button',
    onClick: () => console.log('Clicked!')
  }
};

// テキストタイプのButton
export const TextButton: TStory = {
  args: {
    type: 'text',
    children: 'Text Button',
    onClick: () => console.log('Clicked!')
  }
};

// 波線タイプのButton
export const DashedButton: TStory = {
  args: {
    type: 'dashed',
    children: 'Dashed Button',
    onClick: () => console.log('Clicked!')
  }
};

// リンクタイプのButton
export const LinkButton: TStory = {
  args: {
    type: 'link',
    children: 'Link Button',
    onClick: () => console.log('Clicked!')
  }
};
