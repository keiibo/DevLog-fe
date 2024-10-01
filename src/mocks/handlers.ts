import { http, HttpResponse } from 'msw';
import { sgetBaseUrl } from '../lib/api';

const baseUrl = sgetBaseUrl();
export const handlers = [];
//   http.post(`${baseUrl}/api/login`, () => {
//     // リクエストボディからidentifierとpasswordを取得

//     // 必要に応じて、identifierとpasswordのバリデーションを行う
//     // ここでは簡単のため、固定のレスポンスを返します

//     // レスポンスデータを作成（TPostLoginResに基づく）
//     const response = {
//       token: 'mock-token',
//       userId: 'mock-user-id',
//       userName: 'mock-user-name',
//       email: 'mock-email@example.com',
//       projectIds: ['project1', 'project2', 'project3']
//     };

//     return HttpResponse.json(response);
//   }),
//   http.get(`${baseUrl}/api/tickets/category/:id`, ({ params }) => {
//     const { projectId } = params;

//     console.log('プロジェクトID', projectId);
//     return HttpResponse.json([
//       {
//         name: 'カテゴリー1',
//         uuid: 'test-test-test'
//       },
//       {
//         name: 'カテゴリー2',
//         uuid: 'test-test-test-test'
//       }
//     ]);
//   })
// ];
