// src/routes/AppRouter.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Root } from '../Root';
import { Landing } from '../feature/landing/pages/Landing';
import { Login } from '../feature/auth/pages/Login';
import { Dashboard } from '../feature/dashboard/pages/Dashboard';

export const AppRouter = (): React.JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};
