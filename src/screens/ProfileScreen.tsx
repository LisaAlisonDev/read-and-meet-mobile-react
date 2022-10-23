import { StatusBar } from "expo-status-bar";
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import styles from "../theme/styles";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { UserContext } from "../context/UserContext";



export default function ProfileScreen() {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
 
  return (

    <View style={styles.container}>

      <Text> Page de profil de { userContext.getUser().name} en cours de construction ...</Text>
      

    </View>

  );
}

