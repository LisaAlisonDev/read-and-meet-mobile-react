import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/api/AuthContext';
import styles from "../theme/styles";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { UserContext } from "../context/user/UserContext";

export default function SettingsScreen() {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
      <Text> Page de paramètre ...</Text>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={authContext.logout}>
        <Text style={{color: "white"}}>Déconnexion</Text>
      </TouchableOpacity>
    </View>

  );
}

