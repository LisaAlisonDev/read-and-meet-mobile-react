//ProfilContext.js
import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { ProfileContextType, Profile } from '../../@types/Profile';

const ProfileContext = React.createContext<ProfileContextType>(null);
const {Provider} = ProfileContext;

export type Props = {
   children?: JSX.Element|JSX.Element[];
};

const ProfileProvider : React.FC<Props> = ({children}) => {
  const [profile, setProfile] = useState<Profile>({
    id :  0,
    description : null,
    avatar : null,
    user_id: null,
    visibility: false
  })

  const saveProfile = (profile) => {
    const newProfile : Profile = {
      id : profile.id,
      user_id: profile.user_id,
      visibility : profile.visibility,
      description: profile.description,
      avatar : profile.avatar,
    }
    console.info("saving profile :", profile)
    setProfile(newProfile)
  }

  
  function getProfile() : Profile{
    return profile;
  }
  

  const updateProfile = (profile : Profile) => {
    setProfile(profile)
  }

  return (
    <Provider
      value={{
        setProfile,
        saveProfile,
        getProfile,
        updateProfile,
      }}>
      {children}
    </Provider>
  );
};

export {ProfileContext, ProfileProvider};