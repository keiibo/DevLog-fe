import { ThemeSection } from './ThemeSection';

export default {
  title: 'ThemeSection',
  component: ThemeSection
};

export const Log = () => (
  <ThemeSection
    imageUrl={'src/assets/log.png'}
    imageAlt={'記録する'}
    title={'記録する'}
    description={`プロジェクトを作成し、あなたの個人開発を記録しましょう。
      開発の進捗や学んだ点を詳細に記録して、いつでも振り返ることができます。`}
  />
);

export const Share = () => (
  <ThemeSection
    imageUrl={'src/assets/share.png'}
    imageAlt={'シェアする'}
    title={'シェアする'}
    description={`あなたのプロジェクトやアイディアを共有し、コミュニティと知識を共有しましょう。
      他の開発者と協力し、フィードバックを受け取ることで、より良いソリューションを見つけ出すことができます。`}
  />
);

export const Support = () => (
  <ThemeSection
    imageUrl={'src/assets/beer.png'}
    imageAlt={'応援する'}
    title={'応援する'}
    description={`他の開発者のプロジェクトを支持し、モチベーションの向上に寄与しましょう。
      応援や評価を通じて、クリエイティブなコミュニティを形成し、みんなで成長していきましょう。`}
  />
);
