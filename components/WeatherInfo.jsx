import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import Basic from './Basic';
import Weather from './Weather';

const API_KEY = '83e6f60cc8b4b2cf26d6438f637e3ea7';

export default function WeatherInfo() {
    const [ready, setReady] = useState(false);
    const [temp, setTemp] = useState(0);
    const [condition, setCondition] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                alert(
                    '위치정보 권한을 동의해주세요. 앱 설정에서 권한을 변경해주시기 바랍니다.',
                );
            } else {
                let getLocation = await Location.getCurrentPositionAsync();
                console.log(getLocation)
                const latitude = getLocation.coords.latitude;
                const longitude = getLocation.coords.longitude;
                getWeather(latitude, longitude);
            }
        })();
    }, []);

    const getWeather = async (latitude, longitude) => {
        const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        );
        console.log(data)
        const getTemp = data.main.temp;
        const getCondition = data.weather[0].main;
        const getLocation = data.name;

        setTemp(getTemp);
        setCondition(getCondition);
        setLocation(getLocation);
        setReady(true); //모두 완료됐을때 트루로 놔야함
    };

    return ready ? (
        <Weather
            temp={Math.round(temp)}
            condition={condition}
            location={location}
        />
    ) : (
            <Basic />
        );
}