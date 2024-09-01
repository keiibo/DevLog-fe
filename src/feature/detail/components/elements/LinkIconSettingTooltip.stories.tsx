import { Colors } from '../../../../style/Colors';

import { Meta, StoryObj } from '@storybook/react';
import { LinkIconSettingTooltip } from './LinkIconSettingTooltip';

const meta = {
  title: 'feature/detail/element/LinkIconSettingTooltip',
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  component: LinkIconSettingTooltip,
  tags: ['autodocs']
} satisfies Meta<typeof LinkIconSettingTooltip>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {}
};
