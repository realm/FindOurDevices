import React from 'react';

import { useAuth } from '../providers/AuthProvider';
import Button from './Button';

const TemporaryLogoutButton = () => {
  const { logOut } = useAuth();

  return (
    <Button
      text='Log Out'
      onPress={logOut}
    />
  );
};

export default TemporaryLogoutButton;
