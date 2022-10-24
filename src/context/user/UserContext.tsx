//UserContext.js
import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { UserContextType, User } from '../../@types/user';

const UserContext = React.createContext<UserContextType>(null);
const {Provider} = UserContext;

export type Props = {
   children?: JSX.Element|JSX.Element[];
};

const UserProvider : React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User>({
    id :  0,
    name : null,
    email : null,
    profile : { id : 0, avatar : null, user_id: null,description: null,  visibility: false}
  })

  const saveUser = async (user : User) => {
    const newUser : User = {
      id : user.id,
      name : user.name,
      email : user.email,
      profile: user.profile  
    }

    await saveToStorage('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  function getUser() : User{
    return user;
  }
  
  const updateUser = (user : User)  => {
    setUser(user)
  }

  async function saveToStorage(key, value) : Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async function getUserFromLocal() { // todo : to improve
    let result = await SecureStore.getItemAsync('user');

    if (result !== null) {
      return result;
    } 
    return null;
  }
  
    const logout = async () => {
      setUser(user);
   };

  return (
    <Provider
      value={{
        saveUser,
        setUser,
        getUserFromLocal,
        getUser,
        updateUser,
        logout
      }}>
      {children}
    </Provider>
  );
};

export {UserContext, UserProvider};