import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'elements/Textarea',
  component: Textarea,
  parameters: {
    controls: {
      include: ['placeholder', 'autoSize', 'disabled', 'value']
    }
  },
  tags: ['autodocs']
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => <Textarea placeholder="Enter text here..." />
};

export const Disabled: StoryObj<typeof meta> = {
  render: () => <Textarea placeholder="Disabled textarea" disabled />
};

export const AutoSize: StoryObj<typeof meta> = {
  args: {
    autoSize: true,
    placeholder: 'Auto-resizable textarea'
  }
};

export const CustomSize: StoryObj<typeof meta> = {
  render: () => (
    <Textarea
      autoSize={{ minRows: 2, maxRows: 6 }}
      placeholder="Custom size textarea"
    />
  )
};
