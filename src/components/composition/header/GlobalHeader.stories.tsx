import { Meta, StoryObj } from '@storybook/react';
import { GlobalHeader } from './GlobalHeader';
import { Colors } from '../../../style/Colors';
import { TAuthSliceType } from '../../../store/slice/auth/authSlice';

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

const auth: TAuthSliceType = {
  userId: 'abc',
  userName: 'けいぼー',
  email: 'test@a.com',
  projectIds: ['ABC,DEF']
};

export const Default: TStory = {
  args: {
    selectedProjectName: 'プロジェクト名',
    canView: true,
    setCanView: () => {},
    projectList: [
      {
        _id: '1',
        name: 'プロジェクト1',
        detail: '',
        limitDate: '',
        projectId: '',
        linkIconList: []
      },
      {
        _id: '2',
        name: 'プロジェクト2',
        detail: '',
        limitDate: '',
        projectId: '',
        linkIconList: []
      }
    ],
    setProject: () => {},
    auth
  }
};
