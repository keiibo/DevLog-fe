import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Colors } from '../../../style/Colors';
import { action } from '@storybook/addon-actions';

// Storybookの設定
const meta = {
  title: 'elements/Button', // StorybookのUIに表示されるタイトル
  component: Button, // どのコンポーネントのストーリーかを指定
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
    onClick: () => action('Click'),
    children: 'Default Button'
  }
};

// プライマリータイプのButton
export const Primary: TStory = {
  args: {
    type: 'primary',
    children: 'Primary Button',
    onClick: () => action('Click')
  }
};

// カスタム幅のButton
export const CustomWidth: TStory = {
  args: {
    type: 'primary',
    width: '200px',
    children: 'Wide Button',
    onClick: () => action('Click')
  }
};

// テキストタイプのButton
export const TextButton: TStory = {
  args: {
    type: 'text',
    children: 'Text Button',
    onClick: () => action('Click')
  }
};

// 波線タイプのButton
export const DashedButton: TStory = {
  args: {
    type: 'dashed',
    children: 'Dashed Button',
    onClick: () => action('Click')
  }
};

// リンクタイプのButton
export const LinkButton: TStory = {
  args: {
    type: 'link',
    children: 'Link Button',
    onClick: () => action('Click')
  }
};
