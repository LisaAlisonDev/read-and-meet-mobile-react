import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';
import styles from "../theme/styles";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { UserContext } from "../context/UserContext";



export default function SettingsScreen() {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  return (

    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
      <Text> Page de paramètre ...</Text>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={authContext.logout}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>
    </View>

  );
}

