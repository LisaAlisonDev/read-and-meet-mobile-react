//AuthContext.js
import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRoute } from '@react-navigation/native';

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

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("saving", value)
    setAuthState({
      token: value,
      authenticated: true,
    });
  }
  
  async function getAccessToken() { // todo : change name to token from secure store
    let result = await SecureStore.getItemAsync('token');
    console.log("test", result)
    if (result !== null) {
      return result;
    } 
    return null;
  }

  async function getUser() { // todo : change name to token from secure store
    let result = await SecureStore.getItemAsync('token');
    if (result !== null) {
      return result;
    } 
    return null;
  }
  
  
  const getAuthToken = () => {
    return authState.token;
  };

  
   const logout = async () => {
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
        getAccessToken,
        getUser,
        getAuthToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};