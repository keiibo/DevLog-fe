import { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import { Colors } from '../../../style/Colors';

const meta: Meta<typeof Tab> = {
  title: 'elements/Tabs',
  component: Tab,
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
  render: () => (
    <Tab
      defaultActiveKey="1"
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Tab ${id}`,
          key: id,
          children: `Content of Tab Pane ${id}`
        };
      })}
    >
      item
    </Tab>
  )
};

export const CardType: StoryObj<typeof meta> = {
  render: () => (
    <Tab
      defaultActiveKey="1"
      type="card"
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Tab ${id}`,
          key: id,
          children: `たぶ${id}`
        };
      })}
    />
  )
};
