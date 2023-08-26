import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { CustomRoutes } from '../../routes';
import { UsersContext } from '../contexts/userContext';

export function SignOut() {
  const navigate = useNavigate();
  const { logout } = useContext(UsersContext);

  useEffect(() => {
    logout();
    navigate(CustomRoutes.SIGN_IN);
    location.reload();
  }, []);

  return (
    <div>
      Redirecting to Login Screen...
    </div>
  )
}