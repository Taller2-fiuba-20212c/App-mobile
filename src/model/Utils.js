import AsyncStorage from '@react-native-async-storage/async-storage';

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
