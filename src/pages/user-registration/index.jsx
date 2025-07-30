import React from 'react';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';

const UserRegistration = () => {
  return (
    <AuthenticationLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading font-semibold text-xl text-card-foreground mb-2">
            Únete a la comunidad
          </h2>
          <p className="font-caption text-sm text-muted-foreground">
            Crea tu cuenta y comienza a intercambiar juegos de mesa
          </p>
        </div>

        {/* Social Registration Options */}
        <SocialRegistration />

        {/* Registration Form */}
        <RegistrationForm />
      </div>
    </AuthenticationLayout>
  );
};

export default UserRegistration;