import React, { useContext, useEffect, useState, useCallback } from 'react';
import { User } from '../@types/user';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';
import { UserContext } from '../context/UserContext';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import {
    StyleSheet,
    FlatList,
} from "react-native";
import { Post } from '../@types/post';

const PostCard: React.FC = () => {
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
            <Text style={{ fontWeight: 'bold', marginTop: 20}}>{item.title}</Text>
            <Text>{item.description}</Text>
            </>
        );
    };
    return (
        <View>
            <Text  style={{ marginTop: 10}}> Les annonces postés récemment :</Text>
            {loading && <Text>Loading..</Text>}
            {data && (
                <FlatList
                    style={{ marginTop: 20}}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    )
}

export default PostCard