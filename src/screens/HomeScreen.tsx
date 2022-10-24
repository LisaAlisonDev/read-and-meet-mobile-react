import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import { UserContext } from '../context/UserContext';
import { User } from '../@types/user';
import PostCard from '../components/Posts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import styles from '../theme/styles';
import SettingsScreen from './SettingsScreen';
import { mainColor } from '../theme/constant';
import { tabBarIcon } from '../components/TabBarIcon';
import { Profile } from '../@types/profile';
import { ProfileContext } from '../context/ProfilContext';
import { Avatar } from 'react-native-paper';
import AvatarImage from '../components/AvatarImage';

const HomeScreen: React.FC = () => {
    const profileContext = useContext(ProfileContext)
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<User>()
    const [profile, setProfile] = useState<Profile>()

    const loadUser = useCallback(async () => {
        try {
            const value = await userContext.getUserFromLocal();
            const user = JSON.parse(value)
            const profileInfo = profileContext.getProfile();

            userContext.setUser(user)

            console.log(user)
            setUser(user)
            setProfile(profileInfo)
        } catch (error) {
            let message = `Erreur lors du chargement de l'utilisateur `;
            Alert.alert(message)
            console.log(`${message + error.message}`);
            //  userContext.saveUser(null);

        }
    }, []);

    useEffect(() => {
        loadUser()
    }, []);


    const Tab = createBottomTabNavigator();


    function HomeContent() {
        return (
            <View style={styles.homeContainer}>
                <AvatarImage canEdit={false} profile={profileContext.getProfile()} />
                <Text style={styles.h1}>Bienvenue {userContext.getUser()?.name}!</Text>
                <PostCard />
            </View>
        );
    }

    return (
        <View style={styles.navigationBar}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: mainColor,
                    headerTintColor: mainColor,
                    tabBarIcon: ({ focused, color, size }) => {
                        return tabBarIcon({ focused, color, size, route })
                    }
                })}
            >
                <Tab.Screen name="Home" component={HomeContent} options={{ title: 'Accueil', headerShown: false }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mon profil' }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Mes paramètres' }} />
            </Tab.Navigator>
        </View>
    )
}

export default HomeScreen
