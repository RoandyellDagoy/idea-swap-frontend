import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

const AuthCallBack = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate('/dashboard');
      } else {
        // Optional: handle case where user is not logged in after callback
        navigate('/signin');
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying your account…</h2>
        <p className="text-gray-600">Please wait — you will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default AuthCallBack;