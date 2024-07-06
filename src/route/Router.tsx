// src/routes/AppRouter.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Root } from '../Root';
import { Landing } from '../feature/landing/pages/Landing';
import { Login } from '../feature/auth/pages/Login';
import { Dashboard } from '../feature/dashboard/pages/Dashboard';
import { Create } from '../feature/dashboard/pages/Create';

export const AppRouter = (): React.JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<Landing />} />
        <Route path="/" element={<Root />}>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/create" element={<Create />} />
        </Route>
      </Routes>
    </Router>
  );
};
