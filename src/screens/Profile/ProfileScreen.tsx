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



export default function ProfileScreen() {
  const userContext = useContext(UserContext);
  const profileContext = useContext(ProfileContext)
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<User>()
  const [profile, setProfile] = useState<Profile>()
  const navigation = useNavigation<screenProp>();

  return (

    <><View style={{ justifyContent: 'center', alignContent: "center", marginTop: 10, }}>
      <TouchableOpacity style={{
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
        top: 20,
        left: 35,
        width: 30,
        height: 30,
        borderColor: mainColor, borderRightWidth: 2, borderBottomWidth: 3, borderRadius: 20,
        zIndex: 1001
      }} onPress={() => {
        navigation.navigate('UploadImage');
      }}>
        <MaterialIcons name="mode-edit" size={20} color="white" />
        <Text style={{ textAlign: "center", color: "white", fontFamily: "Raleway_400Regular", marginLeft: 10 }}></Text>
      </TouchableOpacity>
      <View />
      <AvatarImage canEdit={true} avatar={profileContext.getProfile().avatar} />

      <Text style={styles.h1}>{userContext.getUser().name}</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}> {profileContext.getProfile().visibility == true ? "Votre profil est publique" : "Votre profil est privée"}</Text>

      <ProfileButton></ProfileButton>

      <View style={{ padding: 20, backgroundColor: "white" }}>
        <Text style={{ color: darkColor, fontWeight: "bold" }}>#RomanPolicier</Text>
        <Text style={{ marginTop: 20, fontFamily: "Gudea_400Regular", fontWeight: "bold", textAlign: "left" }}> Mon livre du moment :</Text>
        <Text style={{ marginTop: 10, fontFamily: "Gudea_400Regular", textAlign: "left" }}>
          Pas encore de coup de coeur.</Text>

        <Text style={{ marginTop: 20, fontFamily: "Gudea_400Regular", fontWeight: "bold", textAlign: "left" }}> Mon récit de vie :</Text>
        <Text style={{ marginTop: 10, fontFamily: "Gudea_400Regular", textAlign: "left" }}>
          {profileContext.getProfile().description !== "" ? 'Pas encore de description.' : profileContext.getProfile().description}</Text>

      </View>

      {/* <TouchableOpacity style={{
        alignSelf: 'center',
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        backgroundColor: mainColor,
        padding: 10,
        borderColor: secondaryColor, borderRightWidth: 2, borderBottomWidth: 3, borderTopRightRadius: 20
      }} onPress={() => {
        navigation.navigate('UploadImage');
      }}>
        <MaterialCommunityIcons name="plus" size={20} color="white" />
        <Text style={{ textAlign: "center", color: "white", fontFamily: "Raleway_400Regular", marginLeft: 10 }}>Ajouter une photo</Text>
      </TouchableOpacity> */}



    </View>

      <View style={{ backgroundColor: "darkgrey", width: "100%", height: 400, }}>

      </View>


    </>

  );
}

