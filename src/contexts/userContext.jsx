import { createContext, useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStore';

export const UsersContext = createContext();

export function UsersProvider({ children }) {
  let localUsers = getFromLocalStorage('USERS');
  if (!localUsers) {
    setToLocalStorage('USERS', []);
    localUsers = getFromLocalStorage('USERS');
  }

  const [users, setUsers] = useState(localUsers);

  const loggedInUser = users.find(user => user.isLoggedIn);
  const [loggedUser, setLoggedUser] = useState(loggedInUser);

  const setUsersLocalStorage = (stateUsers) => {
    setToLocalStorage('USERS', stateUsers);
    const localUsers = getFromLocalStorage('USERS');
    setUsers(localUsers);
  }

  useEffect(() => {
    const loggedInUser = users.find(user => user.isLoggedIn);
    setLoggedUser(loggedInUser);
  }, [users]);

  const logIn = (username, password) => {
    const userToLogin = {...users.find(user => user.username === username)};

    if (!userToLogin)
      return { success: false, message: 'Wrong username' };

    const isCorrectPassword = userToLogin.password === password;

    if (!isCorrectPassword)
      return { success: false, message: 'Wrong password' };

    userToLogin.isLoggedIn = true;
    const newUsers = [...users.filter(user => user.id !== userToLogin.id), userToLogin];
    setUsersLocalStorage(newUsers);

    return { success: true, message: 'User logged in!' };
  };

  const register = (userObject) => {
    const newUserObject = {
      id: users.length + 1,
      ...userObject,
      isLoggedIn: false,
      orders: []
    };
    const emailTaken = users.some(user => user.email === newUserObject.email);

    if(emailTaken)
      return { success: false, message: 'User with that email already exists'};

    const usernameTaken = users.some(user => user.username === newUserObject.username);

    if (usernameTaken)
      return { success: false, message: 'User with that username already exists'};

    const newUsers = [...users, newUserObject];
    setUsersLocalStorage(newUsers);

    return { success: true, message: 'Successfully saved new user' };
  };

  const logout = () => {
    const logoutUser = {...loggedUser, isLoggedIn: false};
    const newUsers = [...users.filter(user => user.id !== loggedUser.id), logoutUser];
    setUsersLocalStorage(newUsers);
  };

  const updateUserData = (newUserData) => {
    const updatedUser = {...loggedUser, ...newUserData};
    const newUsers = [...users.filter(user => user.id !== loggedUser.id), updatedUser];
    setUsersLocalStorage(newUsers);
  }

  const addOrderToUser = (order) => {
    const newUser = {...loggedUser, orders: [...loggedUser.orders, order]};
    const newUsers = [...users.filter(user => user.id !== loggedUser.id), newUser];
    setUsersLocalStorage(newUsers);
  }

  const valueStore = {
    users,
    setUsers,
    loggedUser,
    setLoggedUser,
    setUsersLocalStorage,
    logIn,
    register,
    addOrderToUser,
    logout,
    updateUserData
  }

  return (
    <UsersContext.Provider value={valueStore}>
      {children}
    </UsersContext.Provider>
  )
}