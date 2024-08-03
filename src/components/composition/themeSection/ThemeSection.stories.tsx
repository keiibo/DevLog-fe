import { Meta, StoryObj } from '@storybook/react';
import { ThemeSection } from './ThemeSection';
import { Colors } from '../../../style/Colors';

const meta = {
  title: 'composition/ThemeSection',
  component: ThemeSection,
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ThemeSection>;

export default meta;
type TStory = StoryObj<typeof meta>;

// Log ストーリー
export const Log: TStory = {
  args: {
    imageUrl: 'src/assets/log.png',
    imageAlt: '記録する',
    title: '記録する',
    description:
      'プロジェクトを作成し、あなたの個人開発を記録しましょう。\n開発の進捗や学んだ点を詳細に記録して、いつでも振り返ることができます。'
  }
};

// Share ストーリー
export const Share: StoryObj<TStory> = {
  args: {
    imageUrl: 'src/assets/share.png',
    imageAlt: 'シェアする',
    title: 'シェアする',
    description:
      'あなたのプロジェクトやアイディアを共有し、コミュニティと知識を共有しましょう。\n他の開発者と協力し、フィードバックを受け取ることで、より良いソリューションを見つけ出すことができます。'
  }
};

// Support ストーリー
export const Support: TStory = {
  args: {
    imageUrl: 'src/assets/beer.png',
    imageAlt: '応援する',
    title: '応援する',
    description:
      '他の開発者のプロジェクトを支持し、モチベーションの向上に寄与しましょう。\n応援や評価を通じて、クリエイティブなコミュニティを形成し、みんなで成長していきましょう。'
  }
};
