import React, { useContext, useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';
import {
    StyleSheet,
    FlatList,
} from "react-native";
import { UserContext } from '../context/UserContext';

const HomeScreen: React.FC = () => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const { authAxios } = useContext(AxiosContext);
    const [data, setData] = useState([]);
    const [user, setUser] = useState({ name: null, email: null })
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        try {
            const value = await userContext.getUserFromStorage();
            const user = JSON.parse(value)

            userContext.setUser({ name: user.name, email: user.email })

            setUser({ name: user.name, email: user.email })

        } catch (error) {
            let message = `Erreur lors du chargement de l'utilisateur `;
            Alert.alert(message)
            console.log(`${ message + error.message}`);
            userContext.saveUser(null);
        }
    }, []);




    const fetchPosts = async () => {
        try {
            const response = await authAxios.get('/posts');
            setData(response.data.data)
            setLoading(false);
        } catch (error) {
            // handle error
            alert(error.message);
        }
    };


    useEffect(() => {
        loadUser()
        fetchPosts();
    }, [loadUser]);

    const renderItem = ({ item }) => {
        return (
            <Text>{item.title}</Text>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Bienvenue {user.name}!</Text>
            {loading && <Text>Loading..</Text>}
            {data && (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={userContext.logout}>
                <Text>Déconnexion</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={authContext.logout}>
                <Text>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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