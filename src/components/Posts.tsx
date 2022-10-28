import React, { useContext, useEffect, useState } from 'react';
import { AxiosContext } from '../context/api/AxiosContext';
import { Text, View } from 'react-native';
import {
    StyleSheet,
    FlatList,
} from "react-native";
import { Post } from '../core/@types/post';
import styles from '../theme/styles';

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
                <View style={{ backgroundColor: '#fff', marginVertical: 5, marginHorizontal: 0 , padding: 5, borderRadius: 10}}>
                    <Text style={{ fontWeight: 'bold',  }}>{item.title}</Text>
                    <Text style={styles.contentText}>{item.description}</Text>
                </View>
            </>
        );
    };
    return (
        <View>
            <Text style={{ marginTop: 10, fontFamily: "Gudea_400Regular", fontSize : 15 }}> Voici les annonces postés récemment :</Text>
            {loading && <Text>Loading..</Text>}
            {data && (
                <FlatList
                    style={{ marginTop : 10}}
                    data={data}
                    renderItem={renderItem}
                    scrollEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    )
}

export default Posts