import { StyleSheet } from "react-native";
import { BASE_COLOR, STATUS_BAR_HEIGHT } from  './../../consts'

export default RegisterStyles = StyleSheet.create({
	container: {
    justifyContent: 'center',
		flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 20
	},

  title: {
		padding: 20,
		fontWeight: 'bold',
		fontSize: 40,
		textAlign: 'center',
	},
  
  signInUp: {
    fontWeight: 'bold', 
    color: BASE_COLOR,
  }
})
