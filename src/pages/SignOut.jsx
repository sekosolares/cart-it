import { useContext, useEffect } from 'react';
import { CustomRoutes } from '../../routes';
import { UsersContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

export function SignOut() {
  const { logout } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate(CustomRoutes.SIGN_IN);
  }, []);

  return (
    <div>
      Redirecting to Login Screen...
    </div>
  )
}