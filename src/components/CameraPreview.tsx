import React from "react"
import { ImageBackground, TouchableOpacity, View, Text } from "react-native"
import AvatarImage from "./AvatarImage"

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
    console.log('sdsfds', photo)


    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%',
                paddingTop : 50,
            }}
        >

            <AvatarImage canEdit={false} avatar={photo.uri} ></AvatarImage>
            {/* <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1
                }}
            /> */}
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
                            onPress={savePhoto}
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