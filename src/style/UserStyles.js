import { StyleSheet } from "react-native";
import { BASE_COLOR } from  '../consts'

export default UserStyles = StyleSheet.create({
	container: {
    justifyContent: 'center',
		flex: 1,
	},

  tittle: {
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
