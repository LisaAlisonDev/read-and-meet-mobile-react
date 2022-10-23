import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { User } from '../@types/user';
import PostCard from '../components/PostCard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import styles from '../theme/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsScreen from './SettingsScreen';


const HomeScreen: React.FC = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<User>()

    const loadUser = useCallback(async () => {
        try {
            const value = await userContext.getUserFromLocal();
            const user = JSON.parse(value)
            userContext.setUser(user)
            setUser(user)
        } catch (error) {
            let message = `Erreur lors du chargement de l'utilisateur `;
            Alert.alert(message)
            console.log(`${message + error.message}`);
            userContext.saveUser(null);
        }
    }, []);

    useEffect(() => {
        loadUser()
    }, []);


    const Tab = createBottomTabNavigator();

    function HomeContent() {
        return (
            <View style={styles.homeContainer}>
                <Image style={styles.image} source={require("../../assets/icon.png")} /> 
                <Text style={styles.title1}>Bienvenue {userContext.getUser()?.name}!</Text>
                <PostCard />
            </View>
        );
    }

    return (
        <View style={styles.navigationBar}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => { // todo : improve this part for icon display on tab bar navigation
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'home'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Profile') {
                    iconName = focused ? 'person-circle-outline' : 'person-circle-sharp';
                  }else{
                    iconName = focused ? 'settings' : 'settings-sharp';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
              }}) }
            
            >
                <Tab.Screen name="Home" component={HomeContent} options={{ title: 'Accueil',   headerShown: false}}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{title : 'Mon profil'}}/>
                <Tab.Screen name="Settings" component={SettingsScreen} options={{title : 'Mes paramètres'}}/>
            </Tab.Navigator>
        </View>
    )
}

export default HomeScreen
