import { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Colors } from '../../../../style/Colors';
import { Priority, Status } from '../../types/TTicket';
import { sgetBaseUrl } from '../../../../lib/api';
import { http, HttpResponse } from 'msw';

const baseUrl = sgetBaseUrl();

const meta = {
  title: 'feature/ticket/compositions/TicketListItem',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.post(`${baseUrl}/api/login`, () => {
          // リクエストボディからidentifierとpasswordを取得

          // 必要に応じて、identifierとpasswordのバリデーションを行う
          // ここでは簡単のため、固定のレスポンスを返します

          // レスポンスデータを作成（TPostLoginResに基づく）
          const response = {
            token: 'mock-token',
            userId: 'mock-user-id',
            userName: 'mock-user-name',
            email: 'mock-email@example.com',
            projectIds: ['project1', 'project2', 'project3']
          };

          return HttpResponse.json(response);
        }),
        http.get(`${baseUrl}/api/tickets/category/:id`, () => {
          return HttpResponse.json({
            categories: [
              {
                name: 'カテゴリー1',
                uuid: 'test-test-test'
              },
              {
                name: 'カテゴリー2',
                uuid: 'test-test-test-test'
              }
            ]
          });
        })
      ]
    },
    backgrounds: {
      default: 'main',
      values: [
        { name: 'main', value: Colors.MAIN },
        { name: 'white', value: Colors.WHITE }
      ]
    }
  },
  argTypes: {
    ticket: {
      control: 'object',
      description: 'The ticket data object to display'
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    ticket: {
      _id: 1,
      ticketId: 'DVLG-1',
      projectId: '100',
      labelColorType: 'blue',
      title: 'Example Ticket Title',
      isDeletable: true,
      limitStartYm: '2022-01',
      limitEndYm: '2022-12',
      priority: Priority.HIGH,
      status: Status.UNDER_CONSTRUCTION,
      detail: 'testtesttesttest',
      createdAt: '',
      categories: [
        {
          name: 'カテゴリー1',
          uuid: 'test-test-test'
        },
        {
          name: 'カテゴリー2',
          uuid: 'test-test-test-test'
        }
      ],
      completedAt: null,
      mileStoneUuid: null
    },
    searchedValue: ''
  }
};

export const CantDelete: TStory = {
  args: {
    ticket: {
      _id: 1,
      ticketId: 'DVLG-1',
      projectId: '100',
      labelColorType: 'blue',
      title:
        '長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル',
      isDeletable: false,
      limitStartYm: '2022-01-01',
      limitEndYm: '2022-12-02',
      priority: Priority.HIGH,
      status: Status.NOT_STARTED,
      detail: 'testtesttesttest',
      createdAt: '',
      categories: [
        {
          name: 'カテゴリー1',
          uuid: 'test-test-test'
        },
        {
          name: 'カテゴリー2',
          uuid: 'test-test-test-test'
        }
      ],
      completedAt: null,
      mileStoneUuid: null
    },
    searchedValue: ''
  }
};
