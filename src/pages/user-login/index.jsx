import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import LoginHeader from './components/LoginHeader';
import SocialLoginOptions from './components/SocialLoginOptions';
import LoginForm from './components/LoginForm';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/marketplace-dashboard');
    }

    // Set page title
    document.title = 'Iniciar Sesión - EURASIK MARKET';
  }, [navigate]);

  return (
    <AuthenticationLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <LoginHeader />

        {/* Social Login Options */}
        <SocialLoginOptions />

        {/* Main Login Form */}
        <LoginForm />
      </div>
    </AuthenticationLayout>
  );
};

export default UserLogin;