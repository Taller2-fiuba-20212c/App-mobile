import {Dimensions, StatusBar} from 'react-native'; 

export const ACCESS_TOKEN = "accessToken"
export const REFRESH_TOKEN = "refreshToken"
export const FAKE_PASSWORD = "password1234"
export const USER_INFO = "userLoged"
export const WIDTH_SCREEN = Dimensions.get('window').width
export const MAX_UNITS = 6

export const HEIGHT_SCREEN = Dimensions.get('screen').height; // device height
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24; 
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const NAV_BAR_HEIGHT = HEIGHT_SCREEN - WINDOW_HEIGHT + StatusBar.currentHeight;