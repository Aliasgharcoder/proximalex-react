import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleGoogleCallback } from '../services/authService';
import { toast } from 'react-toastify';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(error);
        }

        if (!code) {
          throw new Error('Missing authorization code');
        }

        const user = await handleGoogleCallback(code);
        
        // Role-based redirection
        switch(user.role) {
          case 'lawyer':
            navigate('/lawyer/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/');
        }

        toast.success('Login successful!');
      } catch (err) {
        console.error('Authentication error:', err);
        toast.error(err.message || 'Authentication failed');
        navigate('/login');
      }
    };

    processAuth();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Authenticating...</h2>
        <p className="text-gray-600 mt-2">Please wait while we verify your account</p>
      </div>
    </div>
  );
};

export default AuthCallback;