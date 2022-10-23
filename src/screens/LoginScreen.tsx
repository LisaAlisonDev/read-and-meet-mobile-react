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



export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const {publicAxios} = useContext(AxiosContext);
  

  const onLogin = async () => {
    try {
      const response = await publicAxios.post('/connexion', {
        email,
        password,
      });

     
      const {token, user} = response.data;
      await authContext.save("token", token)
      console.log(response.data.user)
      userContext.saveUser(user);
     

    } catch (error) {
      Alert.alert("Erreur" , error.response.data.message);
    }
  };

 
  return (

    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress ={onLogin}>
        <Text style={styles.loginText}>SE CONNECTER</Text>
      </TouchableOpacity>
    </View>

  );
}
