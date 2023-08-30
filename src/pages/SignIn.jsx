import { useContext, useState } from 'react';
import { UsersContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
  const { logIn } = useContext(UsersContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (formData) => {
    formData.preventDefault();
    const { success, message } = logIn(username, password);
    if (!success) {
      alert(message);
      return;
    }

    navigate('/');
  };

  return (
    <div className='w-full flex flex-col justify-center items-stretch max-md:mt-8'>
      <h2 className='font-bold text-3xl text-center'>Sign In</h2>
      <form
        onSubmit={handleSignIn}
        className='flex flex-col self-center justify-between items-center min-h-[300px] w-3/4 md:w-2/4 lg:w-1/3 lg:p-6'
      >
        <div className='flex flex-col justify-around items-center gap-4 w-full'>
          <div className='flex flex-col items-start justify-stretch w-full'>
            <label>Username</label>
            <input type='text' name='username' placeholder='john_doe32' value={username} onChange={(e) => setUsername(e.target.value)} className='p-2 rounded-lg bg-purple-200 w-full' />
          </div>

          <div className='flex flex-col items-start justify-stretch w-full'>
            <label>Password</label>
            <input type='password' name='password' placeholder='Do NOT provide real passwords' value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-lg bg-purple-200 w-full' />
          </div>
        </div>
        <div className='w-full'>
          <button className='w-full bg-purple-600 text-white py-2 px-4 rounded-lg'>Sign In</button>
        </div>
      </form>
    </div>
  )
}
