import React, { useCallback, useContext, useEffect, useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import { AuthContext } from './context/api/AuthContext';
import Spinner from './components/SpinnerComponent';
import { UserContext } from './context/user/UserContext';
import HomeScreen from './screens/HomeScreen';


const LoadFirstScreen  = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await authContext.getTokenFromLocal();
      const user = await userContext.getUserFromLocal();

      const jwt = value;
      const userInfo = user;

      userContext.setUser({ user: userInfo })
      authContext.setAuthState({
        token: jwt || null,
        authenticated: jwt !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Error on loading jwt: ${error.message}`);
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
    return <LoginScreen/>;
  } else {
    return <HomeScreen/>;
  }
};

export default LoadFirstScreen;



