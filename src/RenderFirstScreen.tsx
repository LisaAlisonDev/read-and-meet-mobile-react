import React, {useCallback, useContext, useEffect, useState} from 'react';
import LoginScreen from './screens/LoginScreen';
import {AuthContext} from './context/AuthContext';
import Home from './screens/Home';
import Spinner from './components/SpinnerComponent';


const RenderFirstScreen = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await authContext.getAccessToken();
      console.info("test", value)
      const jwt = value;

      
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

  console.log(authContext?.authState?.authenticated);
  if (authContext?.authState?.authenticated === false) {
    return <LoginScreen />;
  } else {
    return <Home />;
  }
};

export default RenderFirstScreen;