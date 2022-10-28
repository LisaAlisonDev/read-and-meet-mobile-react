//AuthContext.js
import React, {createContext, useState} from 'react';
import { getLocalData, removeLocalData, saveToLocal } from '../../core/services/local.store.management';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

export type Props = {
  children: any;
};

const AuthProvider : React.FC<Props> = ({children}) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  async function save(key, value) : Promise<void>{
    await saveToLocal(key ,value)
    setAuthState({
      token: value,
      authenticated: true,
    });
  }
  
  async function getTokenFromLocal() : Promise<String> {
    let token = await getLocalData('token');
    return token;
  }
  
  const getToken = () : String => {
    return authState.token;
  };

  const removeUserData = async () => {
    await removeLocalData()
  }

   const logout = async () => {
    await removeUserData()
     setAuthState({
       token: null,
       authenticated: false,
     });

     
  };

  return (
    <Provider
      value={{
        authState,
        save,
        getTokenFromLocal,
        getToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};