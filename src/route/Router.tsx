import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
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
import { logout } from '../store/slice/auth/authSlice';

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

  return (
    <Router>
      <Routes>
        <Route path="/about" element={<Landing />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Root />}>
          <Route path="/:id/detail" element={<Detail />} />
          <Route path="/:id/dashboard" element={<Dashboard />} />
          <Route path="/:id/ticket" element={<TicketRoot />} />
          <Route path="/:id/ticket/:ticketId" element={<TicketDetail />} />
          <Route path="/:id/diary" element={<Diary />} />
        </Route>
        <Route path="*" element={<LogoutAndRedirect />} />
      </Routes>
    </Router>
  );
};
