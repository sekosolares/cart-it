import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { CustomRoutes } from '../../routes';

export function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(CustomRoutes.SIGN_IN);
  }, [])

  return (
    <div>
      Redirecting to Login Screen...
    </div>
  )
}