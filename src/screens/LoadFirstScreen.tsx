import React, { useCallback, useContext, useEffect, useState } from 'react';
import LoginScreen from './LoginScreen';
import { AuthContext } from '../context/api/AuthContext';
import Spinner from '../components/App/SpinnerComponent';
import { UserContext } from '../context/user/UserContext';
import HomeScreen from './HomeScreen';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { Gudea_400Regular } from '@expo-google-fonts/gudea';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { Profile } from '../core/@types/profile';
import { ProfileContext } from '../context/user/ProfilContext';
import { User } from '../core/@types/user';

SplashScreen.preventAutoHideAsync();

const LoadFirstScreen  = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
    const profileContext = useContext(ProfileContext)

  const [status, setStatus] = useState('loading');
  const [fontsLoaded] = useFonts({
    Raleway_400Regular, 
    Gudea_400Regular,
    Roboto_400Regular
  });


  const onLayoutRootView = useCallback(async () => {
    setStatus('loading')
    if (fontsLoaded) {
      await loadJWT();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  const loadJWT = useCallback(async () => {
    try {
      const jwt : String = await authContext.getTokenFromLocal();
      const user : User = await userContext.getUserFromLocal();

      userContext.setUser({ user: user })

     // const UserProfile : Profile = user?.profile;
      
      profileContext.setProfile(user?.profile!);

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
    onLayoutRootView();
  }, [onLayoutRootView]);

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



