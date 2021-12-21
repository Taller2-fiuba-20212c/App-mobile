import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export const getData = async (key_name) => {
  try {
    const data = await AsyncStorage.getItem(key_name)
    return data != null ? JSON.parse(data) : null;
  } catch(e) {
    console.error(e);
  }
}

export const storeData = async (key_name, value) => {
  try {
    await AsyncStorage.setItem(key_name, value)
  } catch (e) {
    console.error(e)
  }
}

export const capitalize = (string) => {
  const s = string.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getAvatarTitle = (name, lastname) => {
  return name[0].toUpperCase() + lastname[0].toUpperCase()
}

export const getPlace = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  let location = await Location.getCurrentPositionAsync({});

  const place = await Location.reverseGeocodeAsync({
    latitude : location.coords.latitude,
    longitude : location.coords.longitude
  });

  return place
}

export const getErrorPermissionMsg = (requirement, action) => {
  return 'We need ' + requirement + ' to ' + action
}

export const validateUrl = (url) => {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[2].length == 11
}

export const getVideoId = (url) => {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match[2]
}