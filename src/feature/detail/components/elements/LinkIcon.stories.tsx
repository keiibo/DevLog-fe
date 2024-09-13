import { styled } from 'styled-components';
import { IconType } from '../../../../components/element/icon/Icon';
import { Colors } from '../../../../style/Colors';
import { LinkIcon } from './LinkIcon';

import { Meta, StoryObj } from '@storybook/react';

const CenterDecorator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // 画面の高さに合わせる
`;

const meta = {
  title: 'feature/detail/element/LinkIcon',
  argTypes: {
    type: {
      control: 'select', // selectタイプのコントロールを設定
      options: Object.values(IconType), // IconTypeの値をオプションとして設定
      defaultValue: IconType.GITHUB
    }
  },
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  decorators: [
    (Story) => (
      <CenterDecorator>
        <Story />
      </CenterDecorator>
    )
  ], // デコレータを追加
  component: LinkIcon,
  tags: ['autodocs']
} satisfies Meta<typeof LinkIcon>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    type: IconType.GITHUB,
    uuid: '',
    isInTooltip: true
  }
};
