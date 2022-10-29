import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ProfileContext } from '../context/user/ProfilContext';
import { mainColor, secondaryColor } from '../theme/constant';
import { MaterialIcons } from '@expo/vector-icons';
import { screenProp } from '../core/@types/routes.stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { AxiosContext } from '../context/api/AxiosContext';;
import { uploadProfileImageToServer } from '../core/services/upload.image';
import AvatarImage from '../components/AvatarImage';

export default function UploadImageScreen() {
    const profileContext = useContext(ProfileContext)
    let [isTakingPicture, setTakingPicture] = useState<boolean>(false);
    const navigation = useNavigation<screenProp>();
    const [image, setImage] = useState<string>()
    const [imageInfo, setImageInfo] = useState({})
    const { authAxios } = useContext(AxiosContext);


    const pickImage = async () => {
        setTakingPicture(false)
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.2,
        });

        if (!result.cancelled) {
            setImageInfo(result)
            setImage(result['uri']);
        }

    };

    const takePicture = () => {
        setImage(null)
        navigation.navigate('Camera')
    }


    const uploadToServer = async () => {
        await uploadProfileImageToServer(image, type, name, authAxios, profileContext, navigation)
    }

    const filename = imageInfo["uri"]?.split("/").pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const name = "avatar." + ext;
    const profile = profileContext.getProfile();
    const type = match ? `image/${match[1]}` : `image`;


    return (
        <>
        <View style={{ marginTop : 100}}>
        <AvatarImage canEdit={false} avatar={profile.avatar}></AvatarImage>
        </View>
        {!isTakingPicture ?
            <View style={{ }}>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={takePicture}>
                    <View style={styles.container}>
                        <MaterialIcons name="add-a-photo" size={20} color="white" />
                        <Text style={styles.txtStyle}>Prendre une photo</Text>
                    </View>
                </TouchableOpacity>

                <View style={{
                    display: "flex"
                }}>
                    <TouchableOpacity style={styles.btnStyle} onPress={pickImage}>
                        <Text style={styles.txtStyle}>Prendre une photo depuis la gallerie</Text>
                    </TouchableOpacity>
                </View>
                <Image style={{ width : "50%", height: "50%", justifyContent: "center", alignSelf: "center"}} source={{ uri: image }} />
                {image != null ?
                    <TouchableOpacity style={styles.btnStyle1} onPress={uploadToServer}>
                        <Text style={styles.txtStyle}>Enregistrer</Text>
                    </TouchableOpacity> : null
                }
            </View>
            :
            <View style={{
                display: "flex",
            }}>


            </View>}</>
    )



}

const styles = StyleSheet.create({
    container: { display: "flex", flexDirection: "row", justifyContent: 'center' },
    btnStyle: {
        padding: 20,
        backgroundColor: secondaryColor,
        width: "80%",
        borderRadius: 20,
        alignSelf: "center",
        marginBottom: 20
    },
    btnStyle1: {
        padding: 20,
        backgroundColor: mainColor,
        width: "50%",
        borderRadius: 20,
        alignSelf: "center",
        marginBottom: 20
    },
    txtStyle: { color: "#fff", display: "flex", fontSize: 15, marginLeft: 10, fontFamily: "Raleway_400Regular", textAlign: "center" }
});

