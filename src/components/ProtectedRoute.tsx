import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Якщо немає токена взагалі — викидаємо на логін
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Якщо роль користувача НЕ входить у список дозволених для цього маршруту
  if (!allowedRoles.includes(role)) {
    // Якщо це охоронець, який лізе в адмінку — повертаємо його на карту
    if (role === 'guard') return <Navigate to="/guard" replace />;
    // Якщо це адмін, який лізе на сторінку екіпажу — повертаємо на дашборд
    return <Navigate to="/" replace />;
  }

  // Якщо все добре, рендеримо дочірні компоненти
  return <Outlet />;
}