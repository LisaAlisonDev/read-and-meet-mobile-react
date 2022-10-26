import styles from "../theme/styles"
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from 'react';
import {
  Text,
} from "react-native";

const requiredErrorText = () => {
    return <Text style={styles.validationTextError}> Ce champs est requis.</Text>
}

export const passwordErrorText = () => {
  return <Text style={styles.validationTextError}> Veuillez entrer des mots de passe identique.</Text>
}

export default requiredErrorText;