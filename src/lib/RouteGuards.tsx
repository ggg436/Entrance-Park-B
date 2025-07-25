import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuthContext } from './AuthProvider';

// Route that requires agency role
export const AgencyRoute: React.FC<{ 
  children: React.ReactNode, 
  redirectTo?: string 
}> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { user, loading: authLoading } = useAuthContext();
  const { profile, loading: profileLoading } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for both auth and profile to load
    if (!authLoading && !profileLoading) {
      // If user is not authenticated, redirect to login
      if (!user) {
        navigate('/login');
        return;
      }
      
      // If user is not an agency, redirect
      if (profile && profile.userType !== 'agency') {
        navigate(redirectTo);
      }
    }
  }, [user, profile, authLoading, profileLoading, navigate, redirectTo]);

  if (authLoading || profileLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Only render children if user is authenticated and is an agency
  return (user && profile && profile.userType === 'agency') ? <>{children}</> : null;
};

// Admin route - only accessible by specific email
export const AdminRoute: React.FC<{ 
  children: React.ReactNode, 
  redirectTo?: string 
}> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { user, loading: authLoading } = useAuthContext();
  const { profile, loading: profileLoading } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for both auth and profile to load
    if (!authLoading && !profileLoading) {
      // If user is not authenticated, redirect to login
      if (!user) {
        navigate('/login');
        return;
      }
      
      // If not admin (using email check and isAdmin flag), redirect
      if (!profile?.isAdmin || user.email !== 'sanjokgharti01@gmail.com') {
        navigate(redirectTo);
      }
    }
  }, [user, profile, authLoading, profileLoading, navigate, redirectTo]);

  if (authLoading || profileLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Only render children if user is authenticated and is admin
  return (user && profile && profile.isAdmin && user.email === 'sanjokgharti01@gmail.com') 
    ? <>{children}</> 
    : null;
};

// Legacy export for backward compatibility 
export const FarmerRoute = AgencyRoute; 