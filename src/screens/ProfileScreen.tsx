import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import styles from "../theme/styles";

import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { UserContext } from "../context/UserContext";
import { User } from '../@types/user';
import { Profile } from '../@types/profile';
import { ProfileContext } from '../context/ProfilContext';
import AvatarImage from '../components/AvatarImage';



export default function ProfileScreen() {
  const userContext = useContext(UserContext);
  const profileContext = useContext(ProfileContext)
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<User>()
  const [profile, setProfile] = useState<Profile>()
 
  return (

    <View style={styles.container}>
       <AvatarImage canEdit={true} profile={ profileContext.getProfile()}/>       
      <Text> Page de profil de { userContext.getUser().name} en cours de construction ...</Text>
    </View>

  );
}

