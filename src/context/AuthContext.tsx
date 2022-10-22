//AuthContext.js
import React, {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

export type Props = {
  children: any;
};
const AuthProvider : React.FC<Props> = ({children}) => {
  const [authState, setAuthState] = useState({
    token: null,
  //  refreshToken: null,
    authenticated: null,
  });

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("saving", value)
    setAuthState({
      token: value,
      //refreshToken: null,
      authenticated: true,
    });
  }
  
  async function getAccessToken() {
    let result = await SecureStore.getItemAsync('token');
    console.log("result", result)
    if (result !== null) {
      return result;
    } 
    return null;
  }
  

   const logout = async () => {
  //   await Keychain.resetGenericPassword();
     setAuthState({
       token: null,
       //refreshToken: null,
       authenticated: false,
     });
  };

  // const getAccessToken = () => {
  //   return authState.token;
  // };

  return (
    <Provider
      value={{
        authState,
        save,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};