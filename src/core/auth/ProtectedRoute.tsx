import { JSX, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadUserThunk } from '@features/auth/store/auth.thunks';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const dispatch = useAppDispatch();

  const { accessToken, user, status } = useAppSelector(
    (state) => state.auth
  );

  // On refresh: token exists but user not loaded
  useEffect(() => {
    if (accessToken && !user) {
      dispatch(loadUserThunk());
    }
  }, [accessToken, user, dispatch]);

  // Still resolving session
  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center mt-5">
        <span>Loading...</span>
      </div>
    );
  }

  // Not authenticated
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated
  return children;
}
