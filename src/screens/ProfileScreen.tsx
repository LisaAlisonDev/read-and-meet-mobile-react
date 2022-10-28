import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/api/AuthContext';
import styles from "../theme/styles";

import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { UserContext } from "../context/user/UserContext";
import { User } from '../core/@types/user';
import { Profile } from '../core/@types/profile';
import { ProfileContext } from '../context/user/ProfilContext';
import AvatarImage from '../components/AvatarImage';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { screenProp } from '../core/@types/routes.stack';
import { darkColor, mainColor, secondaryColor } from '../theme/constant';



export default function ProfileScreen() {
  const userContext = useContext(UserContext);
  const profileContext = useContext(ProfileContext)
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<User>()
  const [profile, setProfile] = useState<Profile>()
  const navigation = useNavigation<screenProp>();
 
  return (

    <><View style={{ justifyContent: 'center',  alignContent:"center" , marginTop: 10, }}>
      <AvatarImage canEdit={true} avatar={profileContext.getProfile().avatar} />
      <Text style={styles.h1}>{userContext.getUser().name}</Text>
      <Text style={{textAlign: 'center', marginBottom: 20}}> { profileContext.getProfile().visibility == true ? "Votre profil est publique" : "Votre profil est privée"}</Text>
      <View style={{padding:20, backgroundColor: "white"}}>
    <Text style={{ marginTop: 20, fontFamily: "Gudea_400Regular", fontWeight: "bold", textAlign: "left" }}> Mon livre du moment :</Text>
    <Text style={{ marginTop: 10, fontFamily: "Gudea_400Regular", textAlign: "left" }}>
       Pas encore de coup de coeur.</Text>

    <Text style={{ marginTop: 20, fontFamily: "Gudea_400Regular", fontWeight: "bold", textAlign: "left" }}> Mon récit de vie :</Text>
    <Text style={{ marginTop: 10, fontFamily: "Gudea_400Regular", textAlign: "left" }}>
       {profileContext.getProfile().description !== "" ? 'Pas encore de description.' : profileContext.getProfile().description}</Text>

     

      </View>
      <View style={{ display: "flex", flexDirection:"row", width:"100%", backgroundColor: "white" }}>
      <TouchableOpacity style={{ 
        alignSelf:'center',
        alignItems: 'center',
        display: "flex", 
        flexDirection: "row", 
        backgroundColor: mainColor, 
        padding: 10, 
        borderColor: secondaryColor, borderRightWidth: 2, borderBottomWidth:3, borderTopRightRadius: 20 }} onPress={() => {
        navigation.navigate('UploadImage');
      } }>
        <MaterialCommunityIcons name="image-edit" size={20} color="white" />
        <Text style={{ textAlign: "center", color: "white", fontFamily: "Raleway_400Regular", marginLeft: 10  }}>Modifier ma photo de profil</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{ 
        alignSelf:'center',
        alignItems: 'center',
        display: "flex", 
        flexDirection: "row", 
        backgroundColor: secondaryColor, 
        padding: 10, 
        width: "70%",
        borderColor: mainColor, borderRightWidth: 2, borderBottomWidth:3, borderTopLeftRadius: 20 }} onPress={() => {
        navigation.navigate('UploadImage');
      } }>
        <MaterialCommunityIcons name="camera-image" size={20} color="white" />
        <Text style={{ textAlign: "center", color: "white", fontFamily: "Raleway_400Regular", marginLeft: 10  }}>Modifier ma bio</Text>
      </TouchableOpacity>
</View>
    </View>
   
      <View style={{backgroundColor:"darkgrey", width:"100%", height:400, }}>

      </View>

      </>


  );
}

