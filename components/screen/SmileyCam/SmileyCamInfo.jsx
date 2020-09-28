import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import SmileyCam from './SmileyCam';

export default function SmileyCamInfo() {
    const [hasPermission, setHasPermission] = useState(null); //권한
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status !== 'granted') {
                alert('카메라 권한을 허용해야 접근이 가능합니다.');
            }
        })();
    }, []);

    if (hasPermission === true) {
        return (
            <SafeAreaView style={styles.centerView}>
                <SmileyCam />
            </SafeAreaView>
        );
    } else if (hasPermission === false) {
        return (
            <View style={styles.centerView}>
                <Text style={styles.text}>
                    카메라 접근 권한이 없습니다. 앱 설정에서 카메라 접근 권한을
                    허용해주시기 바랍니다.
                </Text>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Now Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CA1AF',
    },
    text: {
        color: 'white',
        fontSize: 22,
    },
});
