//SmileyCam.js
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const front = Camera.Constants.Type.front;
const back = Camera.Constants.Type.back;

const ALBUM_NAME = 'Smiley Cam'

export default function SmileyCam() {
    const [type, setType] = useState(back);
    const ref = useRef();
    const onFace = ({ faces }) => {
        const face = faces[0];
        if (face) {
            if (face.smilingProbability > 0.5) {
                takePhoto();
            }
        }
    };

    const takePhoto = async () => {
        try {
            const photo = await ref.current.takePictureAsync();
            const photoUri = photo.uri;
            if(photoUri){
                savePhoto(photoUri);
            }
        }catch(err){
            console.log(err)
        }
    }

    const savePhoto = async(photoUri) => {
        try {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            )
            if (status === 'granted'){
                const asset = await MediaLibrary.createAssetAsync(photoUri);
                const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
                if( album === null ){
                    album = await MediaLibrary.createAlbumAsync(
                        ALBUM_NAME,
                        photoUri
                    )
                }else {
                    const cheese = await MediaLibrary.addAssetsToAlbumAsync([asset], album.id)
                }
                setTimeout(() => 3000);
            }
        } catch(err) {
                console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>It is SmileyCam</Text>
            <Camera
                style={{
                    width: windowWidth - 40, //Camera style은 stylesheet가 안먹힌다.
                    height: windowHeight / 1.5,
                }}
                type={type}
                onFacesDetected={onFace}
                faceDetectorSettings={{
                    runClassifications:
                        FaceDetector.Constants.Classifications.all,
                    minDetectionInterval: 2000,
                }}
                ref={ref}
            />
            <View style={styles.cameraIcons}>
                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name={type === front ? 'camera-front' : 'camera-rear'}
                        color="black"
                        size={50}
                        onPress={() => {
                            setType(type === front ? back : front);
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CA1AF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cameraIcons: {
        marginTop: 50,
    },
});
