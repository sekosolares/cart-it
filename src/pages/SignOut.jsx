import { useContext, useEffect } from 'react';
import { CustomRoutes } from '../../routes';
import { UsersContext } from '../contexts/userContext';

export function SignOut() {
  const { logout } = useContext(UsersContext);

  useEffect(() => {
    logout();
    window.location.pathname = CustomRoutes.SIGN_IN;
  }, []);

  return (
    <div>
      Redirecting to Login Screen...
    </div>
  )
}