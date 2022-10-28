import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/api/AuthContext';
import { AxiosContext } from '../context/api/AxiosContext';
import styles from "../theme/styles";
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../context/user/UserContext";
import { ProfileContext } from "../context/user/ProfilContext";
import { RoutesStack } from "../core/@types/routes.stack";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import LogoSvg from "../components/App/LogoSvg";
import { Controller, useForm } from "react-hook-form";
import requiredErrorText from "../components/App/Errors";
import forms from "../theme/styles/forms";
import { User } from "../core/@types/user";
import { Profile } from "../core/@types/profile";


type screenProp = StackNavigationProp<RoutesStack>;

const LoginScreen = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { publicAxios } = useContext(AxiosContext);
  const profileContext = useContext(ProfileContext)
  const navigation = useNavigation<screenProp>();


  const { handleSubmit, control, getValues, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }, mode: 'onBlur'
  });

  const saveUserInfo = async (data : any) => {
    const { token, user } = data;
    await authContext.save("token", token)
    userContext.saveUser(user);

    const UserProfile : Profile = user.profile
    
   profileContext.saveProfile(UserProfile);
  }


  const onLogin = async (data: any) => {
    try {
      const response = await publicAxios.post('/connexion', {
        "email": data.email,
        "password": data.password,
      });

      await saveUserInfo(response.data)
    } catch (error) {
      console.log(error)
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue.");
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}  >
        <LogoSvg width={250} height={180} fill="black" />
        <Text style={styles.h1}>Connexion</Text>
        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={forms.formInputView}>
              <TextInput
                style={forms.formTextInput}
                placeholder="Adresse email"
                placeholderTextColor="grey"
                onChangeText={value => onChange(value)} value={value}
                onBlur={onBlur}
              />
            </View>
          )}
          rules={{
            required: true,
            pattern: new RegExp(/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g),
        }}  />
        {errors?.email?.type == "required" && requiredErrorText()}
        <Controller
          name='password'
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={forms.formInputView}>
              <TextInput
                style={forms.formTextInput}
                placeholder="Mot de passe"
                placeholderTextColor="grey"
                secureTextEntry={true}
                onChangeText={value => onChange(value)} value={value}
                onBlur={onBlur}
              />
            </View>
          )}
          rules={{
            required: true,
          }} />

        {errors?.password?.type == "required" && requiredErrorText()}

        <TouchableOpacity style={forms.loginBtn} onPress={handleSubmit(onLogin)}>
          <Text style={forms.loginText}>SE CONNECTER</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={forms.forgot_button}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{ backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center', paddingHorizontal: 10 }}/>
          <Text style={{ alignSelf: "center", fontSize: 24, paddingHorizontal: 10, }}> OU </Text>
          <View style={{ backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center', paddingHorizontal: 10 }}/>
        </View>

        <Text> Vous n'avez pas encore de compte ?</Text>
        <TouchableOpacity style={forms.registerBtn} onPress={() =>
          navigation.navigate('Register')
        }><Text style={forms.loginText}>S'ENREGISTRER</Text>
        </TouchableOpacity>

      </SafeAreaView>

    </>
  );
}

export default LoginScreen;

