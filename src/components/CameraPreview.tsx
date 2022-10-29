import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ImageBackground, TouchableOpacity, View, Text } from "react-native";
import { AxiosContext } from "../context/api/AxiosContext";
import { ProfileContext } from "../context/user/ProfilContext";
import { screenProp } from "../core/@types/routes.stack";
import AvatarImage from "./AvatarImage";
import { uploadProfileImageToServer } from "../core/services/upload.image";

const CameraPreview = ({ photo, retakePicture }: any) => {
    const { authAxios } = useContext(AxiosContext);
    const profileContext = useContext(ProfileContext)
    const navigation = useNavigation<screenProp>();


    const filename = photo.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const name = "avatar." + ext;

    const __savePhoto = async () => {
        await uploadProfileImageToServer(photo.uri, type, name, authAxios, profileContext, navigation)
    }

    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%',
                paddingTop: 50,
            }}
        >
            <AvatarImage canEdit={false} avatar={photo.uri} ></AvatarImage>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    padding: 15,
                    justifyContent: 'flex-end'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <TouchableOpacity
                        onPress={retakePicture}
                        style={{
                            width: 130,
                            height: 40,

                            alignItems: 'center',
                            borderRadius: 4
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 20
                            }}
                        >
                            Refaire
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={__savePhoto}
                        style={{
                            width: 130,
                            height: 40,

                            alignItems: 'center',
                            borderRadius: 4
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 20
                            }}
                        >
                            Enregistrer
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CameraPreview;