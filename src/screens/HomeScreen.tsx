import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, Alert, Image, SafeAreaView, ScrollView } from 'react-native';
import { UserContext } from '../context/user/UserContext';
import { User } from '../core/@types/user';
import PostCard from '../components/Posts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './Profile/ProfileScreen';
import styles from '../theme/styles';
import SettingsScreen from './SettingsScreen';
import { mainColor, secondaryColor } from '../theme/constant';
import { tabBarIcon } from '../components/App/TabBarIcon';
import { ProfileContext } from '../context/user/ProfilContext';
import AvatarImage from '../components/AvatarImage';

const HomeScreen: React.FC = () => {
    const profileContext = useContext(ProfileContext)
    const userContext = useContext(UserContext);

    const loadUser = useCallback(async () => {
        try {
            const value = await userContext.getUserFromLocal();
            const user: User = JSON.parse(value)
            userContext.setUser(user)
            profileContext.saveProfile(user?.profile);

            //profileContext.setProfile(user?.profile)
        } catch (error) {
            let message = `Erreur lors du chargement de l'utilisateur `;
            Alert.alert(message)
            console.log(`${message + error.message}`);
        }
    }, []);

    useEffect(() => {
        loadUser()
    }, [loadUser]);


    const Tab = createBottomTabNavigator();


    function HomeContent() {
        return (

            <ScrollView><SafeAreaView style={styles.homeContainer}>
                <View style={{ marginTop: 50}}>
                <AvatarImage canEdit={false} avatar={profileContext.getProfile()?.avatar} />
                </View>
                <Text style={styles.h1}>Bienvenue {userContext.getUser()?.name}!</Text>
                <PostCard />
            </SafeAreaView></ScrollView>
        );
    }

    return (
        <View style={styles.navigationBar}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerTitleStyle: { fontFamily: "Roboto_400Regular", fontWeight: "bold", },
                    tabBarActiveTintColor: mainColor,
                    headerTintColor: mainColor,
                    tabBarIcon: ({ focused, color, size }) => {
                        return tabBarIcon({ focused, color, size, route })
                    }
                })}
            >
                <Tab.Screen name="Home" component={HomeContent} options={{ title: 'Accueil', headerShown: false, }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mon profil' }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Mes paramètres' }} />
            </Tab.Navigator>
        </View>
    )
}

export default HomeScreen
