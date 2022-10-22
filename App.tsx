import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import { AxiosProvider } from './src/context/AxiosContext';
import {AppRegistry} from 'react-native';
import RenderFirstScreen from "./src/RenderFirstScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AxiosProvider>
          <RenderFirstScreen/>
        </AxiosProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent("ReadAndMeet", () => App);