import { Camera, CameraType } from 'expo-camera';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraPreview from '../components/CameraPreview';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { screenProp } from '../core/@types/routes.stack';

export default function CameraScreen() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)
    const [startCamera, setStartCamera] = React.useState(true)
    const navigation = useNavigation<screenProp>();
    let camera: Camera


    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }


    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Permission refusé.')
        }
    }

    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync({ quality: 0.2 })

        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)

    }

    const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
    }


    return (
        <View style={{ width: "100%", height: "100%" }}>
            {startCamera ? (
                <View
                    style={{
                        flex: 1,
                        width: '100%'
                    }}
                >
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage} retakePicture={__retakePicture} />
                    ) : (<>

                        <SafeAreaView >
                            <TouchableOpacity
                                style={{ position: 'absolute', zIndex: 1, flexDirection: "row", padding: 20, paddingTop: 40 }}
                                onPress={() => navigation.navigate('UploadImage')}>
                                <MaterialIcons name="arrow-back" size={24} color="white" />
                                <Text style={{ fontSize: 20, color: "#fff", marginLeft: 20, }}>
                                    Retour</Text>
                            </TouchableOpacity>
                        </SafeAreaView><Camera style={{ width: "100%", height: "100%" }} ratio="16:9" type={type} ref={(r) => {
                            camera = r;
                        }}>


                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    flexDirection: 'row',
                                    flex: 1,
                                    width: '100%',
                                    padding: 20,
                                    justifyContent: 'space-between'
                                }}
                            >
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                        <Text style={styles.text}>Flip Camera</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        alignSelf: 'center',
                                        flex: 1,
                                        alignItems: 'center'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={__takePicture}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            bottom: 0,
                                            borderRadius: 50,
                                            backgroundColor: '#fff'
                                        }} />
                                </View>
                            </View>
                        </Camera></>)}
                </View>
            ) : null}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
