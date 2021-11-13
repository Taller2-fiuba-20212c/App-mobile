import { StyleSheet } from "react-native";
import { BASE_COLOR } from  '../consts'

export default UserStyles = StyleSheet.create({
	container: {
    justifyContent: 'center',
		flex: 1,
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
