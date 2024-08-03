import { Meta, StoryObj } from '@storybook/react';
import { GlobalHeader } from './GlobalHeader';
import { Colors } from '../../../style/Colors';

const meta = {
  title: 'composition/GlobalHeader',
  component: GlobalHeader,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof GlobalHeader>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    selectedProjectName: 'プロジェクト名',
    projectList: [
      {
        _id: '1',
        name: 'プロジェクト1',
        detail: '',
        limitDate: '',
        projectId: ''
      },
      {
        _id: '2',
        name: 'プロジェクト2',
        detail: '',
        limitDate: '',
        projectId: ''
      }
    ],
    setProject: () => {}
  }
};
