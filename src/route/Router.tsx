// src/routes/AppRouter.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Root } from '../Root';
import { Landing } from '../feature/landing/pages/Landing';
import { Login } from '../feature/auth/pages/Login';
import { Dashboard } from '../feature/dashboard/pages/Dashboard';
import { Create } from '../feature/dashboard/pages/Create';
import { Diary } from '../feature/diary/pages/Diary';
import { Detail } from '../feature/detail/pages/Detail';
import { Detail as TicketDetail } from '../feature/ticket/pages/Detail';
import { TicketRoot } from '../feature/ticket/pages/TicketRoot';

export const AppRouter = (): React.JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<Landing />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Root />}>
          <Route path="login" element={<Login />} />
          <Route path="/:id/detail" element={<Detail />} />
          <Route path="/:id/dashboard" element={<Dashboard />} />
          <Route path="/:id/ticket" element={<TicketRoot />} />
          <Route path="/:id/ticket/:ticketId" element={<TicketDetail />} />
          <Route path="/:id/diary" element={<Diary />} />
        </Route>
      </Routes>
    </Router>
  );
};
