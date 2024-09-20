import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// packages
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {setError, setWeather} from '../../redux/weatherActions';

// api services
import {getWeatherByCity} from '../../services/WeatherService';

// styles
import styles from './styles';

export const Dashboard = () => {
  // local states
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // dispatch
  const dispatch = useDispatch();

  // selector
  const weatherData = useSelector((state: any) => state.weather.weather);
  const error = useSelector((state: any) => state.weather.error);

  // functionalities
  const fetchWeatherByCity = async () => {
    if (!city) {
      dispatch(setError('Please enter a city'));
      return;
    }

    setLoading(true);
    dispatch(setError(''));

    try {
      const data = await getWeatherByCity(city);
      dispatch(setWeather(data));
    } catch (err) {
      dispatch(setError('Unable to fetch weather data'));
    } finally {
      setLoading(false);
    }
  };

  const getDayLabel = (index: number) => {
    if (index === 0) {
      return 'Today';
    } else if (index === 1) {
      return 'Tomorrow';
    } else {
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const currentDay = new Date().getDay();
      const forecastDay = (currentDay + index) % 7;
      return daysOfWeek[forecastDay];
    }
  };

  // render UI
  const renderWeather = () => {
    if (weatherData) {
      const currentWeather = weatherData.list[0];
      const forecastData = weatherData.list.slice(1, 6);

      return (
        <>
          <View style={styles.weatherInfo}>
            <Text style={styles.city}>{city}</Text>
            <View style={styles.row}>
              <Text style={styles.temp}>{currentWeather.main.temp}</Text>
              <View style={styles.width} />
              <View style={styles.top}>
                <Text style={styles.weatherText}>°C</Text>
                <Text style={styles.weatherText}>
                  {currentWeather.weather[0].description}
                </Text>
              </View>
            </View>
            <View style={styles.top} />
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.weatherText}>Humidity</Text>
                <View style={styles.top} />
                <Text style={styles.weatherText}>
                  {currentWeather.main.humidity}%
                </Text>
              </View>
              <View style={styles.width} />
              <View style={styles.column}>
                <Text style={styles.weatherText}>Wind Speed</Text>

                <View style={styles.top} />
                <Text style={styles.weatherText}>
                  {currentWeather.wind.speed} m/s
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.top} />
          <View style={styles.separator} />

          <FlatList
            data={forecastData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <>
                <View key={index} style={styles.forecastItem}>
                  <Text style={styles.title}>
                    {getDayLabel(index)}: {item.weather[0].description}
                  </Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                    }}
                    style={styles.weatherIcon}
                  />
                </View>
                <View style={styles.top1} />
                <Text style={styles.forecastText}>
                  {item.main.temp_max}°C / {item.main.temp_min} °C
                </Text>
                <View style={styles.top} />
              </>
            )}
          />
        </>
      );
    } else {
      return <Text>No weather data available</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name"
          value={city}
          onChangeText={text => {
            setCity(text);
          }}
        />
        <TouchableOpacity
          onPress={fetchWeatherByCity}
          style={styles.searchIcon}>
          <Icon name="search" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <>
          <ActivityIndicator size="large" color="#ccc" />
        </>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        renderWeather()
      )}
    </SafeAreaView>
  );
};
