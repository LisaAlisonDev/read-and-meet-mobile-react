//ProfilContext.js
import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { ProfilContextType, Profil } from '../@types/Profil';

const ProfilContext = React.createContext<ProfilContextType>(null);
const {Provider} = ProfilContext;

export type Props = {
   children?: JSX.Element|JSX.Element[];
};

const ProfilProvider : React.FC<Props> = ({children}) => {
  const [Profil, setProfil] = useState<Profil>({
    id :  0,
    name : null,
    email : null
  })

  const saveProfil = async (Profil : Profil) => {
    const newProfil : Profil = {
      id : Profil.id,
      name : Profil.name,
      email : Profil.email
    }

    await saveToStorage('Profil', JSON.stringify(newProfil))
    setProfil(newProfil)
  }

  
  function getProfil(){
    return Profil;
  }
  

  const updateProfil = (Profil : Profil) => {
    setProfil(Profil)
  }


  async function saveToStorage(key, value) {
    await SecureStore.setItemAsync(key, value);
  }


  async function getProfilFromStorage() { // todo : change name to token from secure store
    let result = await SecureStore.getItemAsync('Profil');
    console.log("Profil", result)
    if (result !== null) {
      return result;
    } 
    return null;
  }
  
    const logout = async () => {
      setProfil(Profil);
   };

  return (
    <Provider
      value={{
        saveProfil,
        setProfil,
        getProfilFromStorage,
        getProfil,
        updateProfil,
        logout
      }}>
      {children}
    </Provider>
  );
};

export {ProfilContext, ProfilProvider};