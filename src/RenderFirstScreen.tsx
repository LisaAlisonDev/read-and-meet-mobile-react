import React, {useCallback, useContext, useEffect, useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import {AuthContext} from './context/AuthContext';
import Home from './screens/HomeScreen';
import Spinner from './components/SpinnerComponent';
import { UserContext } from './context/UserContext';


const RenderFirstScreen = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await authContext.getAccessToken();
      const user = await userContext.getUserFromStorage();
      
      const jwt = value;
      const userInfo = user;

      userContext.setUser({user : userInfo})
      authContext.setAuthState({
        token: jwt || null,
        authenticated: jwt !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        token: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (authContext?.authState?.authenticated === false) {
    return <LoginScreen />;
  } else {
    return <Home />;
  }
};

export default RenderFirstScreen;