//UserContext.js
import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { UserContextType, User } from '../@types/user';

const UserContext = React.createContext<UserContextType>(null);
const {Provider} = UserContext;

export type Props = {
   children?: JSX.Element|JSX.Element[];
};

const UserProvider : React.FC<Props> = ({children}) => {
  const [user, setUser] = useState({
    user :  null
  })

  const saveUser = async (user : User) => {
    const newUser : User = {
      id : user.id,
      name : user.name,
      email : user.email
    }

    await saveToStorage('user', JSON.stringify(newUser))
    setUser({user : newUser})
  }

  
  function getUser(){
    return user;
  }
  

  const updateUser = (user : User) => {
    setUser({user : user})
  }


  async function saveToStorage(key, value) {
    await SecureStore.setItemAsync(key, value);
  }


  async function getUserFromStorage() { // todo : change name to token from secure store
    let result = await SecureStore.getItemAsync('user');
    console.log("user", result)
    if (result !== null) {
      return result;
    } 
    return null;
  }
  
    const logout = async () => {
      setUser({user : null});
   };

  return (
    <Provider
      value={{
        saveUser,
        setUser,
        getUserFromStorage,
        getUser,
        updateUser,
        logout
      }}>
      {children}
    </Provider>
  );
};

export {UserContext, UserProvider};