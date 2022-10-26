import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/api/AuthContext';
import { AxiosProvider } from './src/context/api/AxiosContext';
import { AppRegistry } from 'react-native';
import RenderFirstScreen from "./src/LoadFirstScreen";
import { UserProvider } from "./src/context/user/UserContext";
import { ProfileProvider } from "./src/context/user/ProfilContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { RoutesStack } from "./src/@types/routes.stack";
import LoadFirstScreen from "./src/LoadFirstScreen";

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
              </Stack.Navigator>
            </ProfileProvider>
          </UserProvider>
        </AxiosProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent("ReadAndMeet", () => App);


function useFonts(arg0: { 'Inter-Black': any; }): [any] {
  throw new Error("Function not implemented.");
}

