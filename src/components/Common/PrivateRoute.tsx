//phim tat: tsrpfc

import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../../components/Layout';
import { NotFound } from './NotFound';

export function PrivateRoute() {
    return (
      <Routes>
        {/* Chuyển về trang admin nếu đã đăng nhập thành công  */}
        <Route path="/login" element={<Navigate to="/admin" />} />
        {/* Other Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/students" element={<StudentFeature />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}
