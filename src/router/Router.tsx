import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from 'react-router-dom';
import { Root } from '../Root';
import { Landing } from '../feature/landing/pages/Landing';
import { Login } from '../feature/auth/pages/Login';
import { Dashboard } from '../feature/dashboard/pages/Dashboard';
import { Create } from '../feature/dashboard/pages/Create';
import { Diary } from '../feature/diary/pages/Diary';
import { Detail } from '../feature/detail/pages/Detail';
import { Detail as TicketDetail } from '../feature/ticket/pages/Detail';
import { TicketRoot } from '../feature/ticket/pages/TicketRoot';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/slice/auth/authSlice';
import { me } from '../feature/auth/api/auth';
import { useQuery } from 'react-query';
import { Loading } from '../components/element/loading/Loading';
import { CreateAccount } from '../feature/auth/pages/CreateAccount';
import { List as NoteList } from '../feature/note/pages/List';
import { Edit as NoteEdit } from '../feature/note/pages/Edit';

export const AppRouter = (): React.JSX.Element => {
  // ログイン画面に強制リダイレクトさせるコンポーネント
  const LogoutAndRedirect = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      // コンポーネントのマウント時にログアウトアクションをディスパッチ
      dispatch(logout());
    }, [dispatch]);
    // ログアウト後にログインページにリダイレクト
    return <Navigate to="/login" replace />;
  };

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { data, error, isLoading } = useQuery('me', me);
    if (isLoading) {
      return <Loading />;
    }

    if (!token || error) {
      // ログインしていない場合は、ログインページにリダイレクト
      // 現在の場所を state に保存して、ログイン後に元の場所に戻れるようにする
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    dispatch(
      login({
        userId: data?.userId || '',
        userName: data?.userName || '',
        email: data?.email || '',
        projectIds: data?.projectIds || []
      })
    );
    return children; // ログインしている場合は、子コンポーネントをそのまま表示
  };

  return (
    <Router>
      <Routes>
        <Route path="/about" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<CreateAccount />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Root />
            </RequireAuth>
          }
        >
          <Route path="/create" element={<Create />} />
          <Route path="/:id/detail" element={<Detail />} />
          <Route path="/:id/dashboard" element={<Dashboard />} />
          <Route path="/:id/ticket" element={<TicketRoot />} />
          <Route path="/:id/ticket/:ticketId" element={<TicketDetail />} />
          <Route path="/:id/diary" element={<Diary />} />
          <Route path="/:id/note" element={<NoteList />} />
          <Route path="/:id/note/create" element={<NoteEdit />} />
        </Route>
        <Route path="*" element={<LogoutAndRedirect />} />
      </Routes>
    </Router>
  );
};
