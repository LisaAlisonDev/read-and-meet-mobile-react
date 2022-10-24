import React, { useContext, useEffect, useState, useCallback } from 'react';
import {  Alert } from 'react-native';
import { UserContext } from '../context/UserContext';
import { User } from '../@types/user';


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