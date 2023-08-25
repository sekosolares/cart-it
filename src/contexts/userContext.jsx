import { createContext, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStore';

export const UsersContext = createContext();
const initialUsers = [
  {
    id: 1,
    username: 'sekosolares',
    email: 'buho@seko.dev',
    firstName: 'Axel',
    lastName: 'Solares',
    isLoggedIn: false
  }
];

export function UsersProvider({ children }) {
  let localUsers = getFromLocalStorage('USERS');
  if (!localUsers) {
    setToLocalStorage('USERS', initialUsers);
    localUsers = getFromLocalStorage('USERS');
  }

  const [users, setUsers] = useState(localUsers);

  const loggedInUser = users.find(user => user.isLoggedIn)
  const [loggedUser, setLoggedUser] = useState(loggedInUser);

  const valueStore = {
    users,
    setUsers,
    loggedUser,
    setLoggedUser
  }

  return (
    <UsersContext.Provider value={valueStore}>
      {children}
    </UsersContext.Provider>
  )
}