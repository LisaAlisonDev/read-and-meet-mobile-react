import React, { useContext, useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import {
    StyleSheet,
} from "react-native";
import { UserContext } from '../context/UserContext';
import { User } from '../@types/user';
import PostCard from '../components/PostCard';

const HomeScreen: React.FC = () => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<User>()

    const loadUser = useCallback(async () => {
        try {
            const value = await userContext.getUserFromStorage();
            const user = JSON.parse(value)
            userContext.setUser(user)
            setUser(user)
        } catch (error) {
            let message = `Erreur lors du chargement de l'utilisateur `;
            Alert.alert(message)
            console.log(`${ message + error.message}`);
            userContext.saveUser(null);
        }
    }, []);

    useEffect(() => {
        loadUser()
    }, []);

    return (
        <View style={styles.container}>
             <Text style={styles.title1}>Bienvenue {user?.name}!</Text> 
             <PostCard/>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={authContext.logout}>
                <Text>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title1: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 36,
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: '100%',
        marginTop: 16,
    },
});


export default HomeScreen