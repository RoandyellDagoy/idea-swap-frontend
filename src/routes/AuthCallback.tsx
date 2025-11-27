import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth state to be set
    if (!loading) {
      if (user) {
        // Create or update user profile with OAuth data
        const createUserProfile = async () => {
          try {
            const supabase = await import('../lib/supabaseClient').then(m => m.default);
            
            // Check if profile exists
            const { data: existingProfile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            if (!existingProfile) {
              // Create new profile for OAuth users
              await supabase
                .from('user_profiles')
                .insert([
                  {
                    id: user.id,
                    full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
                    email: user.email,
                  }
                ]);
            }

            // Redirect to dashboard
            navigate('/dashboard');
          } catch (err) {
            console.error('Error creating profile:', err);
            setError('Failed to setup profile. Redirecting to dashboard...');
            setTimeout(() => navigate('/dashboard'), 2000);
          }
        };

        createUserProfile();
      } else {
        setError('No user found. Redirecting to sign in...');
        setTimeout(() => navigate('/signin'), 2000);
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error ? 'Redirecting...' : 'Completing your sign in...'}
        </h1>
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
