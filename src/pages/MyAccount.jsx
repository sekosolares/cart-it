import { useContext, useState } from 'react';
import { UsersContext } from '../contexts/userContext';

const EditorMode = ({ children, isEditionMode, fallbackValue }) => {
  if (isEditionMode)
    return children;
  else
    return <div className='py-2 text-xl'>{fallbackValue}</div>;
}

export function MyAccount() {
  const { loggedUser, updateUserData } = useContext(UsersContext);
  const [newUserData, setNewUserData] = useState({...loggedUser});
  const [isEditionMode, setIsEditionMode] = useState(false);

  const handleUpdateUser = (formData) => {
    formData.preventDefault();
    updateUserData(newUserData);
    setIsEditionMode(false);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h2 className='font-bold text-3xl'>Register</h2>
      <form
        onSubmit={handleUpdateUser}
        className='gap-4 w-3/4 max-lg:flex max-lg:flex-col max-lg:text-lg lg:grid lg:grid-cols-2 lg:min-h-[250px] lg:p-6'
      >
        <div className='flex flex-col'>
          <label htmlFor='Username'>Username</label>
          <EditorMode isEditionMode={isEditionMode} fallbackValue={loggedUser.username}>
            <input type='text' id='Username' name='username' placeholder='john_doe32' value={newUserData.username} onChange={(e) => setNewUserData({...newUserData, username: e.target.value})} className='p-2 rounded-lg bg-purple-200' required />
          </EditorMode>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='FirstName'>First Name</label>
          <EditorMode isEditionMode={isEditionMode} fallbackValue={loggedUser.firstName}>
            <input type='text' id='FirstName' name='firstName' placeholder='John' value={newUserData.firstName} onChange={(e) => setNewUserData({...newUserData, firstName: e.target.value})} className='p-2 rounded-lg bg-purple-200' />
          </EditorMode>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='Password'>Password {isEditionMode && <span className='text-[10px] font-semibold'>(do NOT provide a serious/real password)</span>}</label>
          <EditorMode isEditionMode={isEditionMode} fallbackValue={loggedUser.password.replace(/./g, '*')}>
            <input type='password' id='Password' name='password' placeholder='This is not stored in a secure way (stored on localStorage)' value={newUserData.password} onChange={(e) => setNewUserData({...newUserData, password: e.target.value})} className='p-2 rounded-lg bg-purple-200' required />
          </EditorMode>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='LastName'>Last Name</label>
          <EditorMode isEditionMode={isEditionMode} fallbackValue={loggedUser.lastName}>
            <input type='text' id='LastName' name='lastName' placeholder='Doe' value={newUserData.lastName} onChange={(e) => setNewUserData({...newUserData, lastName: e.target.value})} className='p-2 rounded-lg bg-purple-200' />
          </EditorMode>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='Email'>Email</label>
          <EditorMode isEditionMode={isEditionMode} fallbackValue={loggedUser.email}>
            <input type='email' id='Email' name='email' placeholder='john.doe@example.com' value={newUserData.email} onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} className='p-2 rounded-lg bg-purple-200' required />
          </EditorMode>
        </div>

        {
          isEditionMode &&
          <div className='flex justify-center items-center lg:col-span-2'>
            <button className='bg-purple-600 text-white py-2 px-4 rounded-lg max-lg:w-full lg:w-1/4'>Save Changes</button>
          </div>
        }
      </form>
      <div className='w-3/4 pt-5 max-lg:text-lg'>
        {!isEditionMode && <button onClick={() => setIsEditionMode(true)} className='w-full py-2 px-6 bg-purple-600 text-base rounded-lg text-white'>Edit</button>}
      </div>
    </div>
  )
}
