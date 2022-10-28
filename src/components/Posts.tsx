import React, { useContext, useEffect, useState } from 'react';
import { AxiosContext } from '../context/api/AxiosContext';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import {
    StyleSheet,
    FlatList,
} from "react-native";
import { Post } from '../core/@types/post';
import styles from '../theme/styles';
import Spinner from './App/SpinnerComponent';
import { darkColor, secondaryColor } from '../theme/constant';

const Posts: React.FC = () => {
    const { authAxios } = useContext(AxiosContext);
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
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

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={{ backgroundColor: '#fff', marginVertical: 5, marginHorizontal: 0, padding: 5, borderRadius: 10,  borderColor: darkColor, borderRightWidth: 2, borderBottomWidth:3, borderBottomRightRadius: 20 }}>
                    <Text style={{ fontWeight: 'bold', }}>{item.title}</Text>
                    <Text style={styles.contentText}>{item.description} le : {item.createdAt}</Text>
                </View>
            </>
        );
    };
    return (
        <View>
            <Text style={{ marginTop: 10, fontFamily: "Gudea_400Regular", fontSize: 15 }}> Voici les annonces postés récemment :</Text>
            {loading && Spinner()}
            {data && (
                <SafeAreaView >
                   
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={true}
                    />
                    
                </SafeAreaView>
            )}
        </View>
    )
}

export default Posts