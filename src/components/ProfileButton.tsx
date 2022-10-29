import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { AuthContext } from '../context/api/AuthContext';
import { ProfileContext } from '../context/user/ProfilContext';
import { UserContext } from '../context/user/UserContext';
import { Profile } from '../core/@types/profile';
import { screenProp } from '../core/@types/routes.stack';
import { User } from '../core/@types/user';
import { mainColor, secondaryColor } from '../theme/constant';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const ProfileButton : React.FC = () => {
    const userContext = useContext(UserContext);
  const profileContext = useContext(ProfileContext)
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<User>()
  const [profile, setProfile] = useState<Profile>()
  const navigation = useNavigation<screenProp>();
  
    return (
       
      <View style={{ display: "flex", flexDirection: "row", width: "100%",  justifyContent: "center" }}>
      <TouchableOpacity style={{
        alignSelf: 'center',
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        backgroundColor: mainColor,
        width: "50%",
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderColor: secondaryColor, borderRightWidth: 2, borderBottomWidth: 3, borderRadius: 20,
      }} onPress={() => {
       // navigation.navigate('UploadImage');
      }}>
        <MaterialCommunityIcons name="eye" size={20} color="white" />
        <Text style={{ textAlign: "center", color: "white", fontFamily: "Raleway_400Regular", marginLeft: 10 }}>Publier mon profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        alignSelf: 'center',
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        backgroundColor: secondaryColor,
        padding: 10,
        marginBottom: 10,
        width: "45%",
        borderColor: mainColor, borderRightWidth: 2, borderBottomWidth: 3, borderRadius: 20,
      }} onPress={() => {
        navigation.navigate('EditProfil');
      }}>
        <MaterialCommunityIcons name="account-edit" size={20} color="white" />
        <Text style={{ textAlign: "center", color: "white", fontFamily: "Raleway_400Regular", marginLeft: 10 }}>Modifier ma bio</Text>
      </TouchableOpacity>
    </View>
    );
}

export default ProfileButton