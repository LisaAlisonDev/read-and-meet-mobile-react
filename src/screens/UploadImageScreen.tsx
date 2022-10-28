import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../context/user/UserContext';

import { ProfileContext } from '../context/user/ProfilContext';
import CameraComponents from './CameraScreen';
import { secondaryColor } from '../theme/constant';
import { MaterialIcons } from '@expo/vector-icons';
import { screenProp } from '../core/@types/routes.stack';
import { useNavigation } from '@react-navigation/native';
import CameraScreen from './CameraScreen';


export default function UploadImageScreen() {
    const profileContext = useContext(ProfileContext)
    const userContext = useContext(UserContext);
    let [isTakingPicture, setTakingPicture] = useState<boolean>(false);
    const navigation = useNavigation<screenProp>();


    return (
        <>{!isTakingPicture ?
            <View style={{ marginTop: 100}}>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => navigation.navigate('Camera')}>
                         <View style={styles.container}>
                        <MaterialIcons name="add-a-photo" size={20} color="white" />
                    <Text style={styles.txtStyle}>Prendre une photo</Text>
                    </View>
                    </TouchableOpacity>

                <View style={{
                    display: "flex"
                }}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => setTakingPicture(false)}><Text style={styles.txtStyle}>Prendre une photo depuis la gallerie</Text></TouchableOpacity>
                </View>
               <Text style={{ textAlign: "center" }}>Gallerie en construction.</Text>
            </View>
            :
            <View style={{
                display: "flex",
            }}>
               
        
            </View>}</>
    )



}

const styles = StyleSheet.create({
    container: {  display: "flex", flexDirection: "row", justifyContent: 'center' },
    btnStyle: {
        padding: 20,
        backgroundColor: secondaryColor,
        width: "80%",
        borderRadius: 20,
        alignSelf: "center",
        marginBottom: 20
    },
    txtStyle:{ color: "#fff", display: "flex", fontSize: 15 , marginLeft: 10, fontFamily:"Raleway_400Regular"}
});

