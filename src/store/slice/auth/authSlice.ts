import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPostLoginRes } from '../../../feature/auth/types/TLogin';
import { TRootState } from '../../store';

// 初期状態
const initialState: TPostLoginRes = {
  userId: '',
  userName: '',
  email: '',
  projectIds: []
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<TPostLoginRes>) => {
      // action.payloadから受け取ったデータでstateを更新
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.projectIds = action.payload.projectIds;
    },
    logout: (state) => {
      // initialStateを使用してstateをリセット
      state.userId = '';
      state.userName = '';
      state.email = '';
      state.projectIds = [];
    }
  }
});

export const { login, logout } = loginSlice.actions;

export const selectAuth = (state: TRootState) => state.auth;

export default loginSlice.reducer;
