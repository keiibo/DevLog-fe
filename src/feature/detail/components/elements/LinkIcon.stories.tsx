import { IconType } from '../../../../components/element/icon/Icon';
import { Colors } from '../../../../style/Colors';
import { LinkIcon } from './LinkIcon';

import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'feature/detail/element/LinkIcon',
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  component: LinkIcon,
  argTypes: {},
  tags: ['autodocs']
} satisfies Meta<typeof LinkIcon>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    type: IconType.GITHUB
  }
};
