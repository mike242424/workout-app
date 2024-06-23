'use client';

import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  function handleLogout() {
    signOut({ callbackUrl: '/' });
  }
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
