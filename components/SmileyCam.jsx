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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const front = Camera.Constants.Type.front;
const back = Camera.Constants.Type.back;

export default function SmileyCam() {
    const [type, setType] = useState(back);

    const onFace = ({ faces }) => {
        const face = faces[0];
        if (face) {
            console.log(face);
            if (face.smilingProbability > 0.7) {
                console.log('너 웃었다. 다음시간에 사진찍는 함수 추가할꺼야');
            }
        }
    };
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
