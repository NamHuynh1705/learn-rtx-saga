import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { PrivateRoute } from './components/Common';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  const navigate = useNavigate();
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/*" element={<PrivateRoute />} />
          <Route index element={<Navigate to="/admin" />} />
        </>
      ) : (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
