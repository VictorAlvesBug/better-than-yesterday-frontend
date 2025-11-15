import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Plans from '../pages/Plans';
import PlanDetails from '../pages/PlanDetails';
import Habits from '../pages/Habits';
import CheckIns from '../pages/CheckIns';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
// Layout
import MainLayout from '../components/Common/MainLayout';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:planId" element={<PlanDetails />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/check-ins" element={<CheckIns />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;
