import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/api/AuthContext';
import { AxiosProvider } from './src/context/api/AxiosContext';
import { AppRegistry } from 'react-native';
import { UserProvider } from "./src/context/user/UserContext";
import { ProfileProvider } from "./src/context/user/ProfilContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { RoutesStack } from "./src/core/@types/routes.stack";
import LoadFirstScreen from "./src/screens/LoadFirstScreen";
import UploadImageScreen from "./src/screens/UploadImageScreen";
import CameraScreen from "./src/screens/CameraScreen";
import EditProfileScreen from "./src/screens/Profile/EditProfileScreen";

const Stack = createNativeStackNavigator<RoutesStack>();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AxiosProvider>
          <UserProvider>
            <ProfileProvider>
              <Stack.Navigator initialRouteName="Loader" >
                <Stack.Screen name="Loader"component={LoadFirstScreen} options={{ headerShown: false}} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{title:'Inscription'}}/>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="EditProfil" component={EditProfileScreen} options={{title:'Modifier ma bio'}}/>
                <Stack.Screen name="UploadImage" component={UploadImageScreen} options={{title:'Modifier ma photo de profil'}}/>
                <Stack.Screen name="Camera" component={CameraScreen} options={{headerShown: false}}/>
              </Stack.Navigator>
            </ProfileProvider>
          </UserProvider>
        </AxiosProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent("ReadAndMeet", () => App);