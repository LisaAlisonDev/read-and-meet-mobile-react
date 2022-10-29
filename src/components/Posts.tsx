import React, { useContext, useEffect, useState } from 'react';
import { AxiosContext } from '../context/api/AxiosContext';
import { ScrollView, Text, View } from 'react-native';
import {
    StyleSheet,
    FlatList,
} from "react-native";
import { Post } from '../@types/post';
import styles from '../theme/styles';
import { darkColor } from '../theme/constant';

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

    return (
        <>
            <Text style={{ marginTop: 10 }}> Voici les annonces postés récemment :</Text>
            {loading && <Text>Loading..</Text>}

            <ScrollView >
                <View style={{ height: "100%" }}>
                    <>
                        {data.map((item: any) => {
                            return (
                                <>
                                    <View key={item.id} style={{ 
                                        backgroundColor: '#fff', 
                                        marginVertical: 5, 
                                        marginHorizontal: 0, 
                                        padding: 5, 
                                        borderRadius: 10, 
                                        borderColor: darkColor, borderRightWidth: 2, borderBottomWidth: 3, borderBottomRightRadius: 20 }}>
                                        <Text style={{ fontWeight: 'bold', }}>{item.title}</Text>
                                        <Text style={styles.contentText}>{item.description} le : {item.createdAt}</Text>
                                    </View></>
                            )

                        })}
                    </>
                </View>
            </ScrollView>


        </>
    )
}

export default Posts