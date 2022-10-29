import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/api/AuthContext';
import styles from "../../theme/styles";

import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { User } from '../../core/@types/user';
import { Profile } from '../../core/@types/profile';
import { ProfileContext } from '../../context/user/ProfilContext';
import AvatarImage from '../../components/AvatarImage';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { screenProp } from '../../core/@types/routes.stack';
import { darkColor, mainColor, secondaryColor } from '../../theme/constant';
import ProfileButton from '../../components/ProfileButton';



export default function EditProfileScreen() {
  const userContext = useContext(UserContext);
  const profileContext = useContext(ProfileContext)
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<User>()
  const [profile, setProfile] = useState<Profile>()
  const navigation = useNavigation<screenProp>();

  return (

    <><View style={{ justifyContent: 'center', alignContent: "center", marginTop: 10, }}>
    </View>


    </>

  );
}

