import { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../../style/Colors';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'elements/Link',
  component: Link,
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
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    children: 'test',
    
  }
};
