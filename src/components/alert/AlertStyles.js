import { StyleSheet } from "react-native";
import { WIDTH_SCREEN, ERROR_COLOR } from './../../consts'

export default AlertStyles = StyleSheet.create({
  container: {
    width: WIDTH_SCREEN * 0.7,
    borderRadius: 20,
  },
  button: {
    backgroundColor: ERROR_COLOR,
    borderRadius: 20,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 17,
  },
})

