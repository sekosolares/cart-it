import { useContext, useState } from 'react';
import { UsersContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { CustomRoutes } from '../../routes';

export function Register() {
  const { register } = useContext(UsersContext);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleRegister = (formData) => {
    formData.preventDefault();
    const { success, message } = register(newUser);
    if (!success) {
      alert(message);
      return;
    }

    alert(message);
    navigate(CustomRoutes.SIGN_IN);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h2 className='font-bold text-3xl'>Register</h2>
      <form
        onSubmit={handleRegister}
        className='grid grid-cols-2 gap-4 p-6 min-h-[250px] w-3/4'
      >
        <div className='flex flex-col'>
          <label htmlFor='Username'>Username*</label>
          <input type='text' id='Username' name='username' placeholder='john_doe32' value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} className='p-2 rounded-lg bg-purple-200' required />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='FirstName'>First Name</label>
          <input type='text' id='FirstName' name='firstName' placeholder='John' value={newUser.firstName} onChange={(e) => setNewUser({...newUser, firstName: e.target.value})} className='p-2 rounded-lg bg-purple-200' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='Password'>Password* <span className='text-[10px] font-semibold'>(do NOT provide a serious/real password)</span></label>
          <input type='password' id='Password' name='password' placeholder='This is not stored in a secure way (stored on localStorage)' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className='p-2 rounded-lg bg-purple-200' required />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='LastName'>Last Name</label>
          <input type='text' id='LastName' name='lastName' placeholder='Doe' value={newUser.lastName} onChange={(e) => setNewUser({...newUser, lastName: e.target.value})} className='p-2 rounded-lg bg-purple-200' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='Email'>Email*</label>
          <input type='email' id='Email' name='email' placeholder='john.doe@example.com' value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className='p-2 rounded-lg bg-purple-200' required />
        </div>

        <div className='col-span-2 flex justify-center items-center'>
          <button className='w-1/4 bg-black text-white py-2 px-4 rounded-lg'>Register</button>
        </div>
      </form>
    </div>
  )
}